THREE.GEO.SpatialMap = function (config) {
	
        THREE.Mesh.apply(this, arguments);
        this.radius = config.radius || 6367;
        this.texture_edge_longitude = 0;
		
};

THREE.GEO.SpatialMap.prototype = new THREE.Mesh();

// For SpatialMaps used as GeoSymbols you can set the coordinates of the symbol through this method.
THREE.GEO.SpatialMap.prototype.setCoordinates = function (coordinates) {
    this.coordinates = {
            phi: coordinates.phi,
            lambda: coordinates.lambda,
			radius: coordinates.radius
    }	
};

// Set the longitudinal offset in degrees to the edge of the texture applied to your geometry.
THREE.GEO.SpatialMap.prototype.setTexturesEdgeLongitude = function (texture_edge_longitude) {
        this.texture_edge_longitude = texture_edge_longitude;
};

// Set the radius of the spatial map.
THREE.GEO.SpatialMap.prototype.setRadius = function (radius) {
        this.radius = radius;
};


THREE.GEO.SpatialMap.prototype.updateGeoSymbol = function (geoSymbol) {
    if (!((geoSymbol instanceof THREE.GEO.GeoSymbol) || (geoSymbol instanceof THREE.GEO.SpatialMap))) {
            console.warn("A must provide an instance of THREE.GEO.SpatialMap.GeoSymbol.");
            return;
    }

	var radius = this.radius;
	if (geoSymbol.coordinates.radius) {
		radius += geoSymbol.coordinates.radius;
	}
        
    var phi = (90 - (geoSymbol.coordinates.phi)) * Math.PI / 180;
    var theta = (180 - (geoSymbol.coordinates.lambda - this.texture_edge_longitude)) * Math.PI / 180;
        
	var scale = 1;//geoSymbol.scale || 1;

	if (geoSymbol instanceof THREE.GEO.SpatialMap) {
	    geoSymbol.position.x = (radius * Math.sin(phi) * Math.cos(theta)) / scale;
	    geoSymbol.position.z = (radius * Math.cos(phi)) / scale;
	    geoSymbol.position.y = (radius * Math.sin(phi) * Math.sin(theta)) / scale;
		
		// this.add(geoSymbol);
	}
    else if ((geoSymbol instanceof THREE.GEO.GeoSymbol)) {
	    geoSymbol.position.x = (radius * Math.sin(phi) * Math.cos(theta)) / scale;
	    geoSymbol.position.z = (radius * Math.cos(phi)) / scale;
	    geoSymbol.position.y = (radius * Math.sin(phi) * Math.sin(theta)) / scale;
		
    	// this.add(geoSymbol);
    }	
};

THREE.GEO.SpatialMap.prototype.addGeoSymbol = function (geoSymbol) {                        
        
    if (!((geoSymbol instanceof THREE.GEO.GeoSymbol) || (geoSymbol instanceof THREE.GEO.SpatialMap))) {
            console.warn("A must provide an instance of THREE.GEO.SpatialMap.GeoSymbol.");
            return;
    }
	
	var radius = this.radius;
	if (geoSymbol.coordinates.radius) {
		radius += geoSymbol.coordinates.radius;
	}
        
    var phi = (90 - (geoSymbol.coordinates.phi)) * Math.PI / 180;
    var theta = (180 - (geoSymbol.coordinates.lambda - this.texture_edge_longitude)) * Math.PI / 180;
        
	var scale = 1;//geoSymbol.scale || 1;

	if (geoSymbol instanceof THREE.GEO.SpatialMap) {
	    geoSymbol.position.x = radius * Math.sin(phi) * Math.cos(theta);
	    geoSymbol.position.z = radius * Math.cos(phi);
	    geoSymbol.position.y = radius * Math.sin(phi) * Math.sin(theta);
		
		this.add(geoSymbol);
	}
    else if ((geoSymbol instanceof THREE.GEO.GeoSymbol)) {
	    geoSymbol.position.x = (radius * Math.sin(phi) * Math.cos(theta)) / scale;
	    geoSymbol.position.z = (radius * Math.cos(phi)) / scale;
	    geoSymbol.position.y = (radius * Math.sin(phi) * Math.sin(theta)) / scale;
		
    	this.add(geoSymbol);
    }
        
};

THREE.GEO.SpatialMap.prototype.coordinatesToVector3 = function (radianCoordinates) {
        
        var vector = new THREE.Vector3();
        
        vector.set(radianCoordinates.x, radianCoordinates.y - Math.PI/2, this.radius);

        vector.set(
                this.radius * Math.cos(vector.y) * Math.sin(vector.x),
                this.radius * Math.sin(vector.y) * Math.sin(vector.x),
                this.radius * Math.cos(vector.x)
        );
        
        return vector;
};        

THREE.GEO.SpatialMap.prototype.constructor = THREE.GEO.SpatialMap;
