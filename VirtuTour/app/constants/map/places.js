import { Asset } from 'expo-asset';
import {KyleFieldImages, AggieParkImages, CenturyTreeImages, SterlingCEvansLibraryImages, BonFireMemorialImages, SpiritPlazaImages, SimpsonDrillFieldImages, MathewGainesStatueImages} from './images'
const SterlingCEvansLibrary = {
    name: "Sterlings C Evans Library",
    latitude: 30.61708581996873, 
    longitude: -96.33897274238043,
    images: SterlingCEvansLibraryImages,
    track : Asset.fromModule(require('../../constants/audio/SterlingCEvansLibrary.mp3')),
    description: "Named after Sterling C. Evans, a devoted advocate for education, this library is more than a collection of books; it's a vibrant center for learning and discovery. Look around and you'll see students engaged in research, collaborating on projects, or delving into our vast digital and print collections that cater to a wide range of academic interests. Our library prides itself on providing state-of-the-art resources, including cutting-edge technology, multimedia stations, and a variety of study spaces to suit every need, from quiet reading rooms to dynamic group study areas. As we move through the library, you'll notice the harmonious blend of traditional architecture with modern facilities, reflecting our commitment to preserving history while embracing the future. Remember, the Sterling C. Evans Library is not just a place to study; it's a space where ideas are born, knowledge is shared, and the Aggie spirit of community and learning thrives."
}

const CenturyTree = {
    name: "Century Tree",
    latitude: 30.615992293486226, 
    longitude: -96.34136807625028,
    images: CenturyTreeImages,
    track : Asset.fromModule(require('../../constants/audio/CenturyTree.mp3')),
    description: "Century Tree is one of Texas A&M University's most cherished landmarks and a symbol deeply rooted in Aggie tradition. This majestic live oak, planted in the early days of the university over a century ago, has grown alongside the institution, witnessing countless milestones and moments. The tree's massive branches, which stretch out protectively over the walkway, have become a symbol of endurance and sheltering guidance, much like the university itself. The Century Tree holds a special place in the hearts of Aggies. It's a popular spot for marriage proposals and is often considered a symbol of good luck and enduring love. Legend has it that if a couple walks under its branches together, they're destined to be together forever, making it a cherished spot for romantic gestures among students and alumni.As you stand beneath its expansive canopy, you're not just standing under a tree; you're becoming part of a tradition that ties generations of Aggies together. The Century Tree is more than just a landmark; it's a living, growing testament to the spirit, history, and community of Texas A&M."
}

const AggiePark = {
    name: "Aggie Park",
    latitude: 30.610393413384177, 
    longitude: -96.33763575863327,
    images: AggieParkImages,
    track : Asset.fromModule(require('../../constants/audio/AggiePark.mp3')),
    description: "As we step into Aggie Park here at Texas A&M University, we're entering a space that beautifully merges tradition with recreation, offering a serene yet vibrant atmosphere. This park, a recent and exciting addition to our campus, reflects the Aggie spirit of community and camaraderie. Spanning over 20 acres, it's a versatile space designed for students, faculty, alumni, and visitors to relax, gather, and engage in a variety of activities. Aggie Park showcases lush greenery, picturesque landscapes, and features like walking trails, picnic areas, and outdoor event spaces. You'll notice the inviting environment it creates for both leisure and university events, including tailgates, concerts, and student activities. One of the key highlights of the park is its proximity to the iconic Kyle Field, making it a popular spot on game days for the Aggie community to come together. As we walk along, observe the thoughtful integration of nature with areas for social interaction. The park is not just a place to unwind amidst the bustle of university life; it's a testament to the university's dedication to enhancing student life and fostering a sense of belonging. Aggie Park is a reflection of Texas A&M's commitment to creating a campus environment where traditions are honored, new memories are made, and the Aggie family is celebrated."
}

const KyleField = {
    name: "Kyle Field",
    latitude: 30.610185221118854, 
    longitude: -96.34010346175411,
    images: KyleFieldImages,
    track : Asset.fromModule(require('../../constants/audio/KyleField.mp3')),
    description: "Kyle Field is the epicenter of Aggie football and one of the most renowned college stadiums in the nation. Kyle Field, named after Edwin Jackson Kyle, an 1899 graduate of the university and a professor of horticulture, isn't just a stadium; it's a symbol of Aggie pride and spirit. The energy here on game days is palpable, with the stadium coming alive with cheers from over 100,000 fans, making it one of the largest in collegiate football. The sight of the field, surrounded by towering stands, is awe-inspiring. You can almost hear the echoes of the Fightin' Texas Aggie Band and the roar of the crowd during the Aggies' football games. Kyle Field is more than a venue for sporting events; it's a gathering place where traditions are celebrated, and memories are made. The 12th Man tradition, unique to Texas A&M, originated here, symbolizing the readiness of the student body to support their team. This tradition encapsulates the sense of unity and commitment that defines the Aggie community. The stadium's design and architecture are state-of-the-art, reflecting A&M's commitment to providing top-tier facilities for its athletics. As you look around, notice how the structure and ambiance of Kyle Field capture the grandeur and spirit of Texas A&M football, making it not just a stadium, but a landmark of Aggie culture and pride."
}

const MemorialStudentCenter = {
    name: "Memorial Student Center (MSC)",
    latitude: 30.613170801617507, 
    longitude: -96.34098025513653, 
    images: MemorialStudentCenter,
    track : Asset.fromModule(require('../../constants/audio/MemorialStudentCenter.mp3')),
    description: "Standing here in the Memorial Student Center (MSC) at Texas A&M University, we're in a place that's much more than a student union; it's a living tribute to the Aggie spirit and a memorial to the Aggies who have laid down their lives for their country. The MSC, often referred to as the 'living room' of the campus, is a central hub for student activities and a space that embodies respect, honor, and tradition. As you walk through these halls, you'll notice the solemn atmosphere that distinguishes it from other student centers. It's a tradition here to remove your hat as a sign of respect, acknowledging that the MSC is more than a building; it's a memorial. The walls are adorned with plaques and displays commemorating Aggies' service and sacrifice, reminding us of the deeper values the university upholds. The MSC is also a vibrant center for student life, hosting a variety of student organizations, meeting rooms, lounges, dining facilities, and art exhibitions. The building frequently buzzes with events, cultural programs, and leadership workshops, fostering a sense of community among students. Beyond its role as a student hub, the MSC also houses the Maroon and White Leadership Program and the MSC Student Programs Office, underscoring its commitment to developing student leadership and engagement. It's a place where Aggies come together not just to relax and socialize, but to grow, lead, and remember the values that define their time at Texas A&M."
}

const SimpsonDrillField = {
    name: "Simpson Drill Field",
    latitude: 30.613168699091883, 
    longitude: -96.34235969461078,
    images: SimpsonDrillFieldImages,
    track : Asset.fromModule(require('../../constants/audio/SimpsonDrillField.mp3')),
    description: "This vast open field, named in honor of Colonel James C. Simpson, a former commandant of the Corps of Cadets, is a vital part of the Aggie experience. Simpson Drill Field is synonymous with the Corps of Cadets, the student military organization known for its precision and discipline. This field is where future leaders are shaped, witnessing countless hours of drills, marches, and ceremonies. The sight of cadets in formation, moving in unison, is a powerful embodiment of the discipline and commitment that the Corps instills in its members. The field also plays host to a variety of campus events, including the revered Muster ceremony, an annual tradition where Aggies gather to honor those who have passed away in the previous year. This solemn event underscores the tight-knit community and enduring spirit of Texas A&M. Around Simpson Drill Field, the presence of historic buildings adds to the sense of tradition. As you look around, you can feel the legacy and spirit of the Aggies who have trained and marched here, a legacy that continues to inspire and mold the character of students at Texas A&M. Simpson Drill Field isn't just a physical space; it's a testament to the values of leadership, honor, and respect that are central to the Aggie ethos."
}

// const London2311 = {
//     name: "London 2311",
//     latitude: 30.590578606177363, 
//     longitude: -96.34264845876957,
//     images: SterlingCEvansLibrary,
//     track : Asset.fromModule(require('../../constants/audio/SterlingCEvansLibrary.mp3')),
//     description: "Spirit Plaza at Texas A&M University serves as a poignant reminder of the institution’s core values and traditions. Centrally located, this plaza is dedicated to honoring Aggie traditions like Muster and Silver Taps, which solemnly remember students who have passed. The Plaza also embodies the Aggie Honor Code and celebrates virtues such as respect, excellence, and integrity. Funded by the class of 1969 and other alumni groups, Spirit Plaza is not only a physical space but a symbolic one, where students reflect on their responsibilities and the deep bonds that connect the Aggie community across generations."
// }

const MathewGainesStatue = {
    name: "Mathew Gaines Statue",
    latitude: 30.6137198204609,
    longitude: -96.34102989010285,
    images: MathewGainesStatueImages,
    track : Asset.fromModule(require('../../constants/audio/MathewGaines.mp3')),
    description: "The Matthew Gaines Statue at Texas A&M University stands as a poignant tribute to a pivotal figure in Texas history. A former slave who became a state senator, Gaines was instrumental in the founding of the Texas public school system. His statue is a symbol of his enduring legacy of advocating for education and civil rights. Positioned prominently on campus, it serves as a constant reminder to students and faculty of the power of resilience and the importance of fighting for equality. This memorial not only honors his contributions but also inspires ongoing discussions about justice and social change."
}

const SpiritPlaza = {
    name: "Spirit Plaza",
    latitude: 30.61591082098759, 
    longitude: -96.34123530017837,
    images: SpiritPlazaImages,
    track : Asset.fromModule(require('../../constants/audio/SpiritPlaza.mp3')),
    description: "Spirit Plaza at Texas A&M University serves as a poignant reminder of the institution’s core values and traditions. Centrally located, this plaza is dedicated to honoring Aggie traditions like Muster and Silver Taps, which solemnly remember students who have passed. The Plaza also embodies the Aggie Honor Code and celebrates virtues such as respect, excellence, and integrity. Funded by the class of 1969 and other alumni groups, Spirit Plaza is not only a physical space but a symbolic one, where students reflect on their responsibilities and the deep bonds that connect the Aggie community across generations."
}

const BonFire = {
    name: "Bonfire Memorial",
    latitude: 30.623461595280858, 
    longitude: -96.33559216635072,
    images: BonFireMemorialImages,
    track : Asset.fromModule(require('../../constants/audio/BonFire.mp3')),
    description: "The Texas A&M Bonfire, a revered university tradition since 1909, symbolized Aggie spirit and unity. Held annually to mark the football rivalry against the University of Texas, this student-built bonfire was one of the most anticipated events of the year, fostering camaraderie and school pride. Constructed from logs, the massive bonfire reached heights of over 50 feet in later years, drawing thousands of participants and spectators. While the tradition was suspended after a tragic collapse in 1999, the spirit of Bonfire still burns brightly in the hearts of Aggies, embodying their resilience, community, and enduring dedication to their alma mater."
}

const locations = [
    SterlingCEvansLibrary,
    CenturyTree,
    AggiePark,
    KyleField,
    MemorialStudentCenter,
    SimpsonDrillField,
    BonFire,
    MathewGainesStatue,
    SpiritPlaza,
]

export {
    locations,
    SterlingCEvansLibrary,
    CenturyTree,
    AggiePark,
    KyleField,
    MemorialStudentCenter,
    SimpsonDrillField,
    SpiritPlaza,
    BonFire,
}