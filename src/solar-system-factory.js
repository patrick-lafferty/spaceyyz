import angular from 'angular';


class SolarSystem {
    constructor() {
        this.planets = [
            {
                name: 'Mercury',
                moons: ['None']
            },
            {
                name: 'Venus',
                moons: ['None']
            },
            {
                name: 'Earth',
                moons: ['None', 'Moon']
            },
            {
                name: 'Mars',
                moons: ['None', 'Phobos', 'Deimos']
            },
            {
                name: 'Jupiter',
                //ALL THESE WORLDS ARE YOURS - EXCEPT EUROPA. ATTEMPT NO LANDINGS THERE.
                moons: ['None', 'Io', 'Europa', 'Ganymede', 'Callisto']
            },
            {
                name: 'Saturn',
                moons: ['None', 'Titan', 'Rhea']
            },
            {
                name: 'Uranus',
                moons: ['None', 'Miranda', 'Ariel', 'Umbriel', 'Titania', 'Oberon']
            },
            {
                name: 'Neptune',
                moons: ['None', 'Triton']
            },
            {
                name: 'Pluto',
                //Hail Hydra
                moons: ['None', 'Charon', 'Styx', 'Nix', 'Kerberos', 'Hydra']
            },
        ];
    }
	}

const solarSystem =	angular
      .module('spaceyyz.solarSystem', [])
      .factory('solarSystemFactory', SolarSystem)
      .name;

export default solarSystem;
