import {SterlingCEvansLibrary,
    BrightBuilding,
    CenturyTree,
    RudderComplex,
    AggiePark,
    KyleField,
    MemorialStudentCenter,
    SimpsonDrillField,
    ZachryBuilding,
    HaynesEngineeringBuilding,
    FoxRunBasketBallCourt,
    London2311
} from "./places.js"

const route1 = {
                source: SterlingCEvansLibrary, 
                destination: MemorialStudentCenter, 
                route:[ SterlingCEvansLibrary, BrightBuilding, ZachryBuilding, 
                        HaynesEngineeringBuilding, CenturyTree, RudderComplex, SimpsonDrillField,
                        KyleField, AggiePark, MemorialStudentCenter],
                colorIndicator: 'grey'
            };

const route2 = {
                source: MemorialStudentCenter, 
                destination: ZachryBuilding,
                route: [MemorialStudentCenter, SimpsonDrillField, KyleField, AggiePark, 
                        CenturyTree, RudderComplex, SterlingCEvansLibrary,HaynesEngineeringBuilding, 
                        BrightBuilding, ZachryBuilding],
                colorIndicator: 'pink'
};  

const route3 = {
                source: ZachryBuilding,
                destination: MemorialStudentCenter,
                route: [ZachryBuilding, BrightBuilding, HaynesEngineeringBuilding,
                        SterlingCEvansLibrary, RudderComplex, CenturyTree, AggiePark,
                        KyleField, SimpsonDrillField, MemorialStudentCenter],
                colorIndicator: 'black'
};

const route4 = {
                source: KyleField,
                destination: ZachryBuilding,
                route: [ KyleField, AggiePark, MemorialStudentCenter, CenturyTree,
                         RudderComplex,HaynesEngineeringBuilding, BrightBuilding, 
                         ZachryBuilding ],
                colorIndicator: 'green'
};

const route5 = {
        source: London2311,
        destination: ZachryBuilding,
        route: [ London2311, FoxRunBasketBallCourt, KyleField, AggiePark,
                MemorialStudentCenter ,CenturyTree,
                RudderComplex,HaynesEngineeringBuilding, BrightBuilding, 
                        ZachryBuilding ],
        colorIndicator: 'green'
};

export default [route1, route2, route3, route4, route5];