import angular from 'angular';

class VehicleVariantService {

    getFamilies() {
        return firebase.database().ref().child('variants').once('value').then(function(snapshot) {
            var familyObject = snapshot.val();
            var families = [];

            if (familyObject !== null) {
                Object.keys(familyObject).forEach(function(key) {
                    var family = familyObject[key];
                    var variants = [];

                    Object.keys(family).forEach(function(variantKey) {
                        var variant = family[variantKey];
                        variant.key = variantKey;
                        variants.push(variant);
                    });

                    family.variants = variants;
                    family.key = key;

                    families.push(family);
                });
            }

            return families;
        });
    }

    addVariant(variant, familyKey) {
        var stages = variant.stages.map(function(stage) {
            return {
                name: stage.name,
                engines: stage.engines.map(engine => engine.key)
            };
        });

        firebase.database().ref().child('variants/' + familyKey).push({
            name: variant.name,
            capacity: variant.capacity,
            cost: variant.cost,
            description: variant.description,
            stages: stages
        });
    }

    updateVariant(variant, familyKey) {
        firebase.database().ref().child('variants/' + familyKey + '/' + variant.key).set({
            name: variant.name,
            stages: variant.stages
        });
    }

    setVariantCount(variant, familyKey) {
        let count = Math.floor(Math.random() * (20 - 3 + 1)) + 3;

        firebase.database().ref().child('variants/' + familyKey + '/' + variant.key).update({
            count: count
        }); 
    }

    deleteVariant(variant, familyKey) {
        firebase.database().ref().child('variants/' + familyKey + '/' + variant.key).remove();
    }

    replaceVariants(familyKey, variants) {
        firebase.database().ref().child('variants/' + familyKey).remove();

        variants.forEach(variant => {
            this.addVariant(variant, familyKey);
        });
    }
}

const variantService = angular
    .module('spaceyyz.launchVehicles.vehicleVariantService', [])
    .service('variantService', VehicleVariantService)
    .name;

export default variantService;
