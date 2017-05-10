// PngElevationTileTerrainProvider.js
// ver 0.1.2, 2016-01-27 西岡 芳晴 ( NISHIOA Yoshiharu )
// PNG標高タイルを使うためのCesium.js用TerrainProvider
// Webメルカトル，正距円筒図法に対応

( function() {

	'use strict';
	var
		defaultUrl =
			//'http://gsj-seamless.jp/labs/elev/elev/{z}/{y}/{x}.png?size=257&errorpng=on',
			'http://kenzkenz.xsrv.jp/m/php/proxy.php?mode=native&url=http://gsj-seamless.jp/labs/elev/elev/{z}/{y}/{x}.png?size=257&errorpng=on',
        defaultCredit 		= 'GSJ, AIST、シームレス地質情報標高サービス(仮称)',
    	defaultHeightWidth 	= 64,	// 標高マップの幅
    	defaultMaximumLevel = 14,	// 最大ズームレベル,
    	defaultTileWidth = 257,		// タイル画像のサイズ
        defaultValue,
        defined,
    	PngElevationTileTerrainProvider;

	if ( typeof Cesium === 'undefined' ) {	// Cesiumが利用できない環境では何も返さず終了
		return;
	}

	defaultValue = Cesium.defaultValue,
    defined = Cesium.defined,
    PngElevationTileTerrainProvider = function( description ) {
    	var
    		credit,
    		tileWidth;	// タイルの画像幅

        description = defaultValue( description, defaultValue.EMPTY_OBJECT );

        this._url = defaultValue( description.url, defaultUrl );
        this._proxy = description.proxy;

		if ( typeof description.tilingScheme !== 'undefined' ) {
			// tilingSchemeの指定があればそれを使用
			this._tilingScheme = description.tilingScheme;
		} else {
			// デフォルトのtilingSchemeはWebメルカトルを使用
	        this._tilingScheme = new Cesium.WebMercatorTilingScheme( {
	        	numberOfLevelZeroTilesX: 2
	        	// Cesium 1.14現在，WebMeractorの標高では1は指定できない
	        } );
	    }

		this._heightmapWidth = defaultValue( description.heightMapWidth, defaultHeightWidth );

		this._maximumLevel = defaultValue( description.maximumLevel, defaultMaximumLevel );

        this._terrainDataStructure = {
            heightScale :  defaultValue( description.heightScale, 1 ),
            heightOffset : defaultValue( description.heightOffset, 0 ),
//            elementsPerHeight : 1,		//デフォルト値なので指定する必要無し
//            stride : 1,					//デフォルト値なので指定する必要無し
//            elementMultiplier : 256,		//デフォルト値なので指定する必要無し
        };

        this._levelZeroMaximumGeometricError =
        		Cesium.TerrainProvider.getEstimatedLevelZeroGeometricErrorForAHeightmap(
        	this._tilingScheme.ellipsoid,
        	this._heightmapWidth,
        	this._tilingScheme.getNumberOfXTilesAtLevel( 0 )
        );

        this._errorEvent = new Cesium.Event();

        credit = defaultValue( description.credit, defaultCredit );
        if (typeof credit === 'string') {
            credit = new Cesium.Credit( credit );
        }
        this._credit = credit;

        tileWidth = defaultValue( description.tileWidth, defaultTileWidth );
        this._zoomAdjustment = Math.floor(
        		Math.log( tileWidth / this._heightmapWidth / 2 ) * Math.LOG2E );
    };
    Cesium.PngElevationTileTerrainProvider = PngElevationTileTerrainProvider;

    PngElevationTileTerrainProvider.prototype.requestTileGeometry = function(x, y, level, throttleRequests) {
        var
        	orgx = x,				// リクエストされたx座標を保持
        	orgy = y,				// リクエストされたy座標を保持
        	url = this._url,		// タイル画像URLテンプレート
	        proxy = this._proxy,	// プロキシ
	    	zoomAdj = Math.min( level, this._zoomAdjustment ),
	    						// ズームレベル調整係数．
						    	// zoomAdjustmentよりlevelが小さいときはlevel値そのものになる
	    	xAdj = 1,			// x座標の補正用
	    	yAdj = 0,			// y座標の補正用，webMelcatorは0, LatLngは1
	    	xAdj2, yAdj2,	// 標高マップとタイル画像の倍率の差
	        that = this,
	    	promise;

      	if ( this._tilingScheme.constructor === Cesium.GeographicTilingScheme ) {
	    	yAdj = 1;
		}
		xAdj2 = Math.pow( 2, zoomAdj + xAdj );
		yAdj2 = Math.pow( 2, zoomAdj + yAdj );

		// ズームレベル調整値によりタイル座係数を変更
		level -= zoomAdj;
		x >>= zoomAdj + xAdj;
		y >>= zoomAdj + yAdj;

        url = url.replace( '{z}', level );
        url = url.replace( '{y}', y );
        url = url.replace( '{x}', x );

        throttleRequests = defaultValue( throttleRequests, true );
        if (throttleRequests) {
            promise = Cesium.throttleRequestByServer (url, Cesium.loadImage );
            if ( !defined( promise ) ) {
                return undefined;
            }
        } else {
            promise = Cesium.loadImage(url);
        }

        return Cesium.when( promise, function( image ) {
	       	var
            	hmp,							// 出力する標高マップ( HeightMap )
            	wim = image.width,				// 標高タイル画像の横幅
            	whm = that._heightmapWidth,		// 標高マップの横幅
            	errorpng = ( wim === 1 );		// 標高タイル画像の幅が1なら無効タイルとみなし，
            									// errorpng = true

			// 標高マップの準備．標高分解能により各データサイズを変更
			// 誇張のために1以下を指定したときも32bitとして扱ってしうまうが
			// まれなケースであり動作には支障はない
			if ( that._terrainDataStructure.heightScale < 1 ) {
				hmp = new Int32Array( whm * whm )
			} else {
				hmp = new Int16Array( whm * whm )
			}
            if( !errorpng ){
                var
	            	bpp = 4,    							// bytes per pixel
					pix = Cesium.getImagePixels( image ),	// 標高タイル画像データ
					p_hmp = 0,								// 標高マップ内のポインター
					p,										// 標高タイル画像内のポインタ
					px,											// pのx成分
					px0   = ( wim - 1 ) * ( orgx / xAdj2 % 1 ),	// pxの初期値
					py    = ( wim - 1 ) * ( orgy / yAdj2 % 1 ),	// pのy成分
					pxinc = ( wim - 1 ) / ( whm - 1 ) / xAdj2,	// pxの増加量
					pyinc = ( wim - 1 ) / ( whm - 1 ) / yAdj2,	// pyの増加量
					h;										// 標高値

                for( var y = 0; y < whm; ++y ){
                    px = px0;
                    for( var x = 0; x < whm; ++x ){
                        p = ( Math.round( py ) * wim + Math.round( px ) ) * bpp
                        h = 256 * ( 256 * pix[ p+0 ] + pix[ p+1 ] ) + pix[ p+2 ];
                        h = ( h == 8388608 ) ? 0 : h;	// 無効値補正
                        hmp[ p_hmp++ ] = h << 8 >> 8;	// 24ビットの2補数表現と解釈
                        px += pxinc;
                    }
                    py += pyinc;
                }

            }
            return new Cesium.HeightmapTerrainData({
                buffer : hmp,
                width :  whm,
                height : whm,
                structure : that._terrainDataStructure,
                childTileMask : level < that._maximumLevel && !errorpng ? 15 : 0,
            } );
/*
       }, function(){			// File Not Foundのときは，ダミーのデータを返す
       	   						// 開発者ツールのエラーメッセージは無くならないが，
       	   						// 若干少なくなる
       	   						// が，深く傾けるとエラーで止まるようになる
            return new Cesium.HeightmapTerrainData({
                buffer : null,
                width :  0,
                height : 0,
                structure : that._terrainDataStructure,
                childTileMask : 0
            } );
*/
        } );
    };

    PngElevationTileTerrainProvider.prototype.getLevelMaximumGeometricError = function(level) {
        return this._levelZeroMaximumGeometricError / (1 << level);
    };

    PngElevationTileTerrainProvider.prototype.getTileDataAvailable = function(x, y, level) {
        return undefined;
    };

    Cesium.defineProperties( PngElevationTileTerrainProvider.prototype, {
        errorEvent : {
            get : function() {
                return this._errorEvent;
            }
        },
        credit : {
            get : function() {
                return this._credit;
            }
        },
        tilingScheme : {
            get : function() {
                return this._tilingScheme;
            }
        },
        ready : {
            get : function() {
                return true;
            }
        },
        hasWaterMask : {
            get : function() {
                return false;
            }
        },
        hasVertexNormals : {
            get : function() {
                return false;
            }
        }
    } );

} )();
