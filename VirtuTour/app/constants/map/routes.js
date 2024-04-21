import {SterlingCEvansLibrary,
    CenturyTree,
    AggiePark,
    KyleField,
    MemorialStudentCenter,
    SimpsonDrillField,
    BonFire,
    SpiritPlaza,
    London2311
} from "./places.js"

const route1 = {
                source: BonFire, 
                destination: MemorialStudentCenter, 
                route:[ BonFire, SpiritPlaza, CenturyTree, SimpsonDrillField, 
                        KyleField, AggiePark, MemorialStudentCenter],
                colorIndicator: 'red'
            };

const route2 = {
                source: MemorialStudentCenter, 
                destination: BonFire,
                route: [MemorialStudentCenter, SimpsonDrillField, KyleField, AggiePark, 
                        CenturyTree, SpiritPlaza, SterlingCEvansLibrary, BonFire],
                colorIndicator: 'green'
};  

const route3 = {
                source: SterlingCEvansLibrary,
                destination: MemorialStudentCenter,
                route: [ SterlingCEvansLibrary, SpiritPlaza, CenturyTree, AggiePark,
                        KyleField, SimpsonDrillField, MemorialStudentCenter],
                colorIndicator: 'yellow'
};

const route4 = {
                source: KyleField,
                destination: BonFire,
                route: [ KyleField, AggiePark, MemorialStudentCenter, CenturyTree, SpiritPlaza, BonFire],
                colorIndicator: 'blue'
};

const route5 = {
        source: London2311,
        destination: SpiritPlaza,
        route: [London2311, KyleField, AggiePark,
                MemorialStudentCenter ,CenturyTree, BonFire, SpiritPlaza],
        colorIndicator: 'green'
};

export default [route1, route2, route3, route4, route5];