import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import '../blog.css'
import { Divider, IconButton } from '@mui/material';
// import PreferencesDropdown from './preferenceDropDown';
import ScrollBar from 'react-perfect-scrollbar';
import { Button} from '@mui/material';
// import PreferencesDropdown from './preferenceDropDown';
import { parrentHeading } from './The_Basics_of_Sodium_and_Health';
import HeadingListComponent from './HeadingListComponent';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const preference = [
  {title:'Glossary of Terms',link:'#Glossary_of_Terms'},
    { title: "Introduction to Salt Types and Their Uses", link: "#introduction-to-salt-types-and-their-uses" },
    { title: "Common Types of Salt and Their Characteristics", link: "#common-types-of-salt-and-their-characteristics" },
    { title: "Exploring Salt Substitutes", link: "#exploring-salt-substitutes" },
    { title: "Choosing the Right Salt for Cooking and Baking", link: "#choosing-the-right-salt-for-cooking-and-baking" },
    // { title: "Salt and Its Impact on Health", link: "#salt-and-its-impact-on-health" },
    { title: "Summary and Practical Tips", link: "#summary-and-practical-tips" },
    // { title: "References", link: "#references" }
];

const Beginner_Guide_to_Salt: React.FC = () => {





 // const [searchQuery, setSearchQuery] = useState<string>(""); // Search query state/
  const [debouncedSearch, setDebouncedSearch] = useState<string>(""); // Debounced search query state
  const scrollableContentRef = useRef<HTMLDivElement>(null); // Ref to scrollable content
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for debounced timeout

// Handle search input change and debounce the search query
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// setSearchQuery(e.target.value);
if (searchTimeoutRef.current) {
  clearTimeout(searchTimeoutRef.current); // Clear previous timeout
}
searchTimeoutRef.current = setTimeout(() => {
  setDebouncedSearch(e.target.value);
}, 1000); // Wait for 1000ms after user stops typing
};

useEffect(() => {
if (debouncedSearch) {
  // When search query is updated after debouncing
  const elements = scrollableContentRef.current?.querySelectorAll("span,h4,b,a");

  if (elements) {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    elements.forEach((element: any) => {
      const textContent = element.textContent || element.innerText;
      const regex = new RegExp(debouncedSearch, "i");
      if (regex.test(textContent)) {
        // If a match is found, scroll the element into view and highlight it
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.style.backgroundColor = "var(--green)"; // Highlight the matched text
      } else {
        element.style.backgroundColor = ""; // Remove previous highlights if no match
      }
    });
  }
}
}, [debouncedSearch]); // Run effect when debounced search changes



// const [headingList,setHeadingList]=useState<HTMLElement[]>([]);
const [section_headingList,setSection_HeadingList]=useState<parrentHeading[]>([]);

const [isReading,setIsReading]=useState<boolean>(false)



const closeAll=()=>{
setIsReading(false)
const sections=document.querySelectorAll('body .blogPage .scrollable-content section') as NodeListOf<HTMLElement>;
if(sections){
  // console.log(sections)
sections.forEach((section:HTMLElement) => {
  section.style.display = 'none';
});
}
else{
  console.log("no element",sections)
}
}
useEffect(() => {


closeAll()
const headingParents:parrentHeading[]=preference.map((e)=>{
return {
  element:document.querySelector(e.link) as HTMLElement,
  ...e
}
});
setSection_HeadingList(headingParents)




return () => {
  
};
}, []);

const getChildrenHading = (link: string) => {
const el: HTMLElement[] = [];
console.log(`getting...`, `body .blogPage .scrollable-content ${link} b, body .blogPage .scrollable-content ${link} h4`);

// Select all 'b' and 'h4' elements inside the specified 'link' selector
(document.querySelectorAll(`body .blogPage .scrollable-content ${link}, body .blogPage .scrollable-content ${link}`) as NodeListOf<HTMLElement>).forEach((e: HTMLElement) => {
  // Traverse up to the parent 'section' element
  const sectionParent = e.closest('section');  // This will get the closest parent 'section' of the current element
  // Check if we found the 'section' parent and add children 'b' and 'h4' of that 'section' to the list
  if (sectionParent) {
    const sectionChildren:NodeListOf<HTMLElement>= sectionParent.querySelectorAll('b, h4');  // Select all 'b' and 'h4' inside the 'section'
    sectionChildren.forEach((child: HTMLElement) => {
      el.push(child);
    });
  }
});

return el;
}

const open = (heading: HTMLElement,index?:number) => {
closeAll()
let parent = heading.parentElement;
console.log(index);
// Traverse up the DOM until a <section> element is found or no parent exists
console.log(`searching parent`)
while (parent) {
    if (parent.nodeName.toLowerCase() === 'section') {
        (parent as HTMLElement).style.display = 'initial';
        break; // Stop once the section is found
    }
    parent = parent.parentElement;
}


if(parent){
  setIsReading(true)
///search selected headin from dom
  // setSearchQuery(heading.innerText);
if (searchTimeoutRef.current) {
  clearTimeout(searchTimeoutRef.current); // Clear previous timeout
}
searchTimeoutRef.current = setTimeout(() => {
  setDebouncedSearch(heading.innerText);
}, 1000); // Wait for 1000ms after user stops typing
}


// console.log(`parent found!`,parent)
};


const showChildren=(e:parrentHeading)=>{
const els= getChildrenHading(e.link)
setCurrentChildren(els);
setSection_HeadingList(section_headingList.map((el)=>{
 if(e.link==el.link){
  el.children=e.children ? null:els
}
else{
  el.children=null
}
return el
}));

}
// console.log(headingList);

const [currentChildren,setCurrentChildren]=useState<HTMLElement[]>()
const [currentContentIndex, setCurrentContentIndex] = useState<number>(0); // Track current index
// Function to go to the next child in the list
const goToNextChild = () => {
  if (preference && currentContentIndex < preference.length - 1) {
    const nextIndex = currentContentIndex + 1;
    setCurrentContentIndex(nextIndex);
    const preference_=preference.map((e)=>{
      return {
        element:document.querySelector(e.link) as HTMLElement,
        ...e
    }
    });
    showChildren(preference_[nextIndex])
   setTimeout(() => {
    if( currentChildren && currentChildren[0])open(currentChildren[0])
      else console.log('no child here ...')
   },1000);
  }
  else{
    console.log("reached end")
  }
};

// Function to go to the previous child in the list
const goToPrevChild = () => {
  if (currentContentIndex > 0) {
    const nextIndex = currentContentIndex - 1;
    setCurrentContentIndex(nextIndex);
    const preference_=preference.map((e)=>{
      return {
        element:document.querySelector(e.link) as HTMLElement,
        ...e
    }
    });
    showChildren(preference_[nextIndex])
   setTimeout(() => {
    if( currentChildren && currentChildren[0])open(currentChildren[0])
      else console.log('no child here ...')
   },1000);
  }
  else{
    console.log("reached end")
  }
};


return (      <div className='body'>
    <div className='blogPage'>
    <b className='header'>A Beginner's Guide to salt Types and Uses
        </b>
<Divider/>

<div className='d-flex justify-content-between' style={{gap:5}}>
<div className='searchInput' style={{flexGrow:'1'}}>
<input onChange={handleSearchChange}  placeholder='Search resources'/>
</div>
{/* <PreferencesDropdown preference={preference}/> */}
</div>

{isReading && <>
  <div className='d-flex align-items-center'>
<Button onClick={()=>setIsReading(false)} style={{width:`100%`,color:`white`,marginTop:5,gap:5,borderRadius:30,background:`radial-gradient(circle, var(--yellow),var(--bg))`}} className={`d-flex align-items-center`}> <FaArrowLeft/>  Content list</Button>
  </div>
</>}

{!isReading && <div className='scrollable-content'>

{section_headingList.map((e:parrentHeading,i:number)=>{
const text=e.title;
return <HeadingListComponent setSection_HeadingList={setSection_HeadingList} key={i} item={e} text={text} open={open} click={()=>{
  showChildren(e)
  setCurrentContentIndex(i);
}}/>
})}

</div>}


<div className='scrollable-content' style={{display:!isReading ? `none` :``,maxHeight:'65vh' }} ref={scrollableContentRef}>
<br/>
<section className='Glossary_of_Terms_section'>
  <h4 id='Glossary_of_Terms'>Glossary of Terms</h4>

  <ul>
    <li><b>Electrolyte:</b> A mineral that carries an electric charge, essential for various bodily functions, such as fluid balance and muscle function.</li>
    <li><b>Sodium:</b> A key mineral found in salt, vital for nerve and muscle function but potentially harmful in large amounts.</li>
    <li><b>Potassium Chloride:</b> A salt substitute containing potassium instead of sodium, commonly used for reducing sodium intake.</li>
    <li><b>Trace Minerals:</b> Minerals found in small amounts in some salts, like magnesium and calcium, which add slight flavor but don’t significantly impact health.</li>
    <li><b>Umami:</b> A savory flavor often found in foods like mushrooms and tomatoes, used to enhance the taste of low-sodium dishes.</li>
    <li><b>Salt Sensitivity:</b> A genetic tendency for blood pressure to be affected by salt intake, more common in certain populations and age groups.</li>
  </ul>
</section>
<br/>
<br/>
<section className='introduction-to-salt-types-and-their-uses_section'>
  <h4 id='introduction-to-salt-types-and-their-uses'> Introduction to Salt Types and Their Uses</h4>

  <b>Objective:</b>
  <p>To understand the different types of salt, their unique characteristics, and how choosing the right salt can enhance both flavour and health.</p>
  <br/>

  <p><b>What is Salt?</b></p>
  <p>
    Salt is a mineral essential to life. It plays important roles in keeping our bodies balanced and functioning well. Specifically, salt helps:
  </p>
  <ul>
    <li>Maintain fluid balance in the body, which is necessary for staying hydrated.</li>
    <li>Support nerve function so that we can feel sensations and move our muscles.</li>
    <li>Assist muscle contraction for everything from the heartbeat to everyday movements.</li>
  </ul>

  <p>
    While salt is necessary for health, the type and amount we consume can make a big difference. There are many varieties of salt, each with unique qualities like texture, flavour, and mineral content. Understanding these differences can help us make informed choices for cooking and overall health.
  </p>
  <br/>

  <p><b>Why Does the Type of Salt Matter?</b></p>


  <p>
    Choosing the right salt can enhance the flavour and texture of food, making meals more enjoyable without adding too much. Different salts also vary in their sodium content and mineral composition:
  </p>
  <ul>
    <li><b>Texture:</b> Some salts are fine and dissolve quickly, while others are coarse and add crunch.</li>
    <li><b>Taste:</b> Varieties like sea salt can bring a slight oceanic flavour, while Himalayan salt is often described as having a milder taste.</li>
    <li><b>Mineral Content:</b> Certain salts, like sea salt and Himalayan pink salt, contain trace minerals, adding subtle flavours but not enough to significantly impact health.</li>
  </ul>
  <br/>

  <p><b>Common Salt Types</b></p>


  <p>Here is a quick overview of some popular salt types:</p>
  <ul>
    <li><b>Table Salt:</b> Refined and often contains added iodine. Ideal for everyday cooking and baking.</li>
    <li><b>Sea Salt:</b> Harvested from evaporated seawater, it can be coarser and may have trace minerals.</li>
    <li><b>Himalayan Pink Salt:</b> Known for its pink colour, it contains trace minerals like iron and is often used as a finishing salt.</li>
    <li><b>Kosher Salt:</b> Coarse and additive-free, it’s popular among chefs for seasoning meats and adding texture.</li>
  </ul>
</section>

<br/>
<section className='common-types-of-salt-and-their-characteristics_section'>
  <h4 id='common-types-of-salt-and-their-characteristics'> Common Types of Salt and Their Characteristics</h4>

  <b>Objective:</b>
  <p>To introduce the basics of salt, its essential role in the body, and the importance of choosing different salt types for flavour and health.</p>
  <br/>

  <p><b>1. Table Salt</b></p>
  <p><b>Description:</b> Table salt is the most commonly used salt. It is refined and finely ground, with added iodine to support thyroid health, as well as anti-caking agents to keep it from clumping.</p>
  <p><b>Uses:</b> Ideal for everyday cooking, baking, and seasoning because it dissolves quickly and blends evenly in recipes.</p>
  <p><b>Health Note:</b> Due to its fine grain, table salt has a high sodium density, meaning a small amount can contain a lot of sodium. Be mindful of portions, as it is easy to add too much.</p>
  <p><b>Image Suggestion:</b> Table salt in a shaker, shown with common kitchen ingredients like pepper and sugar for context.</p>
<br/>

  <p><b>2. Sea Salt</b></p>
  <p><b>Description:</b> Sea salt is made by evaporating seawater, which allows it to retain trace minerals like magnesium and calcium. These minerals give sea salt a slightly briny flavour and sometimes a coarse texture.</p>
  <p><b>Uses:</b> Great for finishing dishes like salads, grilled vegetables, and meats to add a light crunch and delicate flavour. It also works well in marinades.</p>
  <p><b>Health Note:</b> Sea salt is sometimes marketed as a “healthier” alternative due to its minerals, but its sodium content is similar to that of table salt. Most of the time, the trace minerals are too minimal to significantly impact health.</p>
  <p><b>Image Suggestion:</b> Coarse sea salt in a small dish next to herbs or a freshly prepared salad to show versatility.</p>
  <br/>

  <p><b>3. Himalayan Pink Salt</b></p>
  <p><b>Description:</b> Mined from ancient salt deposits in Pakistan, Himalayan pink salt contains trace minerals, including iron, which gives it a distinctive pink colour and mild, earthy taste.</p>
  <p><b>Uses:</b> Often used as a finishing salt for its appearance and light flavour in gourmet dishes. It is also popular for aesthetic uses, like in salt lamps and bath salts.</p>
  <p><b>Health Note:</b> While it contains small amounts of minerals, these are too minor to provide additional health benefits compared to other salts. Its sodium content is comparable to table salt, so it should be used in moderation.</p>
  <p><b>Image Suggestion:</b> A small bowl of pink salt with a cutting board and chef’s knife to highlight its appeal in cooking.</p>
  <br/>

  <p><b>4. Kosher Salt</b></p>
  <p><b>Description:</b> Kosher salt is coarse and additive-free, making it a favourite among chefs for its texture and ease of handling. The larger flakes dissolve slowly, allowing for more control in seasoning.</p>
  <p><b>Uses:</b> Ideal for seasoning meats and vegetables, as the flakes adhere well and add texture. It is also used in general cooking, especially in recipes that require larger salt grains.</p>
  <p><b>Health Note:</b> Kosher salt is lighter by volume than table salt, which can help reduce sodium intake when used in the same measurements as finer salts.</p>
  <p><b>Image Suggestion:</b> Kosher salt flakes on a butcher block next to raw meats to emphasize its use in seasoning.</p>
  <br/>

  <p><b>5. Celtic Sea Salt</b></p>
  <p><b>Description:</b> Harvested from coastal regions, Celtic Sea salt retains its moisture and contains trace minerals. It often appears moist, gray, and coarse due to its natural harvesting process.</p>
  <p><b>Uses:</b> Popular in gourmet cooking and as a finishing salt. Its moist, coarse texture makes it ideal for sprinkling over roasted or grilled foods.</p>
  <p><b>Health Note:</b> Like other sea salts, it contains trace minerals but also has comparable sodium levels to table salt. Its health benefits are similar to other minimally refined salts.</p>
  <p><b>Image Suggestion:</b> Celtic sea salt in a small dish, with a rustic setting to highlight its natural, unprocessed look.</p>
  <br/>

  <p><b>6. Flake Salt</b></p>
  <p><b>Description:</b> Flake salt has light, delicate crystals that are thin and irregular in shape, often harvested from sea salt. It is known for its mild taste and fast-dissolving texture.</p>
  <p><b>Uses:</b> Primarily used as a finishing salt, flake salt adds a light crunch to dishes and dissolves quickly, making it ideal for salads, grilled meats, and desserts.</p>
  <p><b>Health Note:</b> Flake salt’s light texture means that a small pinch goes a long way, potentially helping to control sodium intake. However, sodium levels are still comparable to other salts.</p>
  <p><b>Image Suggestion:</b> Flake salt sprinkled over a freshly cooked dish, showcasing its delicate, crispy texture.</p>
  <br/>

  <p><b>7. Black Salt (Kala Namak)</b></p>
  <p><b>Description:</b> Black salt, or kala namak, is a type of rock salt commonly used in South Asian cooking. It has a distinctive sulfuric aroma and taste due to the presence of sulphur compounds.</p>
  <p><b>Uses:</b> Often used in Indian and Southeast Asian dishes, as well as in vegan cooking to add an “egg-like” flavour. Black salt is popular in salads, chutneys, and some beverages.</p>
  <p><b>Health Note:</b> While black salt contains a range of minerals, its sodium content is similar to that of regular salt. Its distinct flavour can be used sparingly, which may help reduce overall sodium intake.</p>
  <p><b>Image Suggestion:</b> Black salt in a small bowl next to spices commonly used in South Asian cooking, like turmeric and cumin.</p>
  <br/>

  <p><b>8. Smoked Salt</b></p>
  <p><b>Description:</b> Smoked salt is made by smoking salt crystals over wood fires, giving it a rich, smoky flavour and aroma. It’s available in various textures, from coarse to fine.</p>
  <p><b>Uses:</b> Adds a smoky flavour to dishes without needing to use smoked ingredients. It is popular in grilled meats, roasted vegetables, and even cocktails.</p>
  <p><b>Health Note:</b> Although smoked salt does not have added health benefits, it can enhance flavour, allowing you to use less salt overall.</p>
  <p><b>Image Suggestion:</b> Smoked salt in a small dish near grilled vegetables or meats to emphasize its culinary uses.</p>

  <p><b>Common Salt Types and Their Characteristics</b></p>

  <br/>
  <ScrollBar style={{width:'100%'}}>
  <table className='salt-table'>
    <thead>
      <tr>
        <th>Salt Type</th>
        <th>Description</th>
        <th>Best Uses</th>
        <th>Health Note</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Table Salt</td>
        <td>Refined, fine grain, often iodized</td>
        <td>Everyday cooking, baking</td>
        <td>High sodium density, so use sparingly</td>
      </tr>
      <tr>
        <td>Sea Salt</td>
        <td>Coarse or fine, retains trace minerals</td>
        <td>Finishing, marinades</td>
        <td>Comparable sodium to table salt</td>
      </tr>
      <tr>
        <td>Himalayan Pink Salt</td>
        <td>Mined, pink hue from iron, mild flavor</td>
        <td>Finishing, gourmet uses</td>
        <td>Minimal health difference</td>
      </tr>
      <tr>
        <td>Kosher Salt</td>
        <td>Coarse, additive-free, slow dissolving</td>
        <td>Meat seasoning, general cooking</td>
        <td>Lower sodium by volume</td>
      </tr>
      <tr>
        <td>Celtic Sea Salt</td>
        <td>Moist, gray, coarse texture</td>
        <td>Finishing, roasted foods</td>
        <td>Similar sodium to sea salt</td>
      </tr>
      <tr>
        <td>Flake Salt</td>
        <td>Thin, light crystals, mild taste</td>
        <td>Finishing for crunch</td>
        <td>Light texture, easy to control portions</td>
      </tr>
      <tr>
        <td>Black Salt (Kala Namak)</td>
        <td>Sulfuric aroma, used in South Asian dishes</td>
        <td>Vegan dishes, chutneys</td>
        <td>Unique taste allows for sparing use</td>
      </tr>
      <tr>
        <td>Smoked Salt</td>
        <td>Salt smoked over wood, rich flavor</td>
        <td>Grilled meats, roasted veggies</td>
        <td>Enhances flavor, use in moderation</td>
      </tr>
    </tbody>
  </table>
  <br/>
  <br/>

  
  </ScrollBar>
</section>

<br/><br/>
<section className='exploring-salt-substitutes_section'>
  <h4 id='exploring-salt-substitutes'>Exploring Salt Substitutes</h4>
  <p><b>Objective:</b> To understand popular salt substitutes, how they mimic the taste of salt, and the health benefits and precautions associated with using them.</p>
<br/>
  <p><b>1. Potassium Chloride</b></p>
  <p><b>Description:</b> Potassium chloride is a common salt substitute that looks and tastes similar to regular salt but contains potassium instead of sodium.</p>
  <p><b>Uses:</b> Ideal for people on low-sodium diets, potassium chloride can be used in place of table salt in cooking and at the table.</p>
  <p><b>Health Note:</b> While potassium chloride helps reduce sodium intake, it should be used cautiously. People with kidney conditions, those on certain medications, or individuals with low blood pressure should consult a doctor before using it, as too much potassium can worsen kidney health or further lower blood pressure.</p>
<br/>

  <p><b>2. Herbal Salt Blends</b></p>
  <p><b>Description:</b> Herbal salt blends combine small amounts of salt with dried herbs and spices or may be entirely salt-free. This mix adds robust flavour without relying on sodium.</p>
  <p><b>Uses:</b> Great for seasoning meats, vegetables, soups, and sauces, herbal salt blends add depth to dishes without excess salt. Common herbs include garlic, rosemary, thyme, and basil.</p>
  <p><b>Health Note:</b> These blends are an excellent choice for reducing sodium while keeping meals flavourful. Homemade blends can be customized to suit personal tastes and dietary needs.</p>
<br/>

  <p><b>3. Other Low-Sodium Options</b></p>
  <p><b>Citrus and Vinegar:</b> Lemon juice, lime, and vinegar can enhance flavours with their natural acidity, making them great salt-free options for marinades, dressings, and cooked dishes.</p>
  <p><b>Spices and Seasonings:</b> Cumin, paprika, turmeric, black pepper, and chili powder add rich flavours to food without any sodium.</p>
</section>

<section className='choosing-the-right-salt-for-cooking-and-baking_section'>
  <h4 id='choosing-the-right-salt-for-cooking-and-baking'> Choosing the Right Salt for Cooking and Baking</h4>


<br/>

  <p><b>Objective:</b> Understand different types of salts used in cooking and baking, focusing on their textures and flavour profiles.</p>
  <br/>

  <p><b>1. Everyday Cooking</b></p>
  <p><b>Best Salt Types:</b> Table salt and kosher salt</p>
  <p><b>Description:</b> Table salt and kosher salt are versatile for everyday cooking. Table salt dissolves quickly, while kosher salt’s coarser texture makes it ideal for seasoning.</p>
  <p><b>Use Tip:</b> Kosher salt works well for meats and vegetables, as its large flakes add flavour with less salt than finer-grain table salt.</p>
  <p><b>Healthy Alternative:</b> Try adding fresh herbs, garlic, or lemon zest to dishes instead of relying on salt. These natural ingredients can enhance flavour and reduce the need for salt.</p>
  <br/>

  <p><b>2. Seasoning Meats and Vegetables</b></p>
  <p><b>Best Salt Type:</b> Kosher salt</p>
  <p><b>Description:</b> Kosher salt’s coarse flakes are ideal for coating meats and seasoning vegetables, as it adheres well and adds a balanced flavour.</p>
  <p><b>Use Tip:</b> Use kosher salt sparingly, especially if combined with other seasonings, and consider adding fresh rosemary, thyme, or black pepper for extra depth of flavour.</p>
  <p><b>Healthy Alternative:</b> Marinate meats and vegetables in a blend of vinegar, citrus juice, and herbs. This not only reduces the need for salt but also tenderizes meats and adds a tangy flavour.</p>
  <br/>

  <p><b>3. Finishing Dishes</b></p>
  <p><b>Best Salt Types:</b> Sea salt and Himalayan pink salt</p>
  <p><b>Description:</b> These salts are often used as finishing salts because their coarse texture and mineral-rich taste can add a special touch to dishes.</p>
  <p><b>Use Tip:</b> Use a small pinch of sea salt or Himalayan pink salt over salads, roasted vegetables, or grilled foods just before serving. This keeps the salt on the surface for maximum flavour with minimal quantity.</p>
  <p><b>Healthy Alternative:</b> For finishing touches, try a sprinkle of toasted sesame seeds, chopped fresh herbs, or a splash of balsamic vinegar. These alternatives add texture and flavour without the need for added salt.</p>
  <br/>

  <p><b>4. Baking</b></p>
  <p><b>Best Salt Type:</b> Table salt</p>
  <p><b>Description:</b> Table salt’s fine grains distribute evenly in baking, ensuring consistent flavour throughout. Since baking relies on precise measurements, even a small amount of salt can make a big difference.</p>
  <p><b>Use Tip:</b> Use the exact amount specified in baking recipes and consider other natural flavour enhancers like vanilla extract or cinnamon for added taste without increasing sodium.</p>
  <p><b>Healthy Alternative:</b> In certain recipes, you can reduce the salt by half and still achieve great flavour by adding spices such as nutmeg or ginger.</p>
</section>

<section>
  <h4>Health Considerations by Salt Type and Body System</h4>

<br/>

  <p><b>Objective:</b> To show how different salts can impact various aspects of health.</p>
  <br/>

  <p><b>1. Heart Health</b></p>
  <p><b>Effect:</b> High salt intake raises blood pressure, which can lead to heart disease and stroke over time. Salt causes the body to retain water, increasing blood volume and putting more strain on the heart.</p>
  <p><b>Best Practice:</b> Use low-sodium options like potassium chloride or herbal salt blends to flavour foods without the added sodium. For extra flavour, try herbs like rosemary or basil.</p>
  <p><b>Health Note:</b> Individuals with high blood pressure, a history of heart disease, or a family history of these conditions should limit their salt intake to support heart health.</p>

<br/>
<p><b>2. Kidney Health</b></p>
  <p><b>Effect:</b> Kidneys work to filter excess sodium from the blood, but too much salt can overload these organs, potentially worsening kidney function over time.</p>
  <p><b>Best Practice:</b> Use herbal blends and naturally low-sodium ingredients to season food. Fresh garlic, onion powder, and lemon juice can add flavour without straining the kidneys.</p>
  <p><b>Health Note:</b> People with kidney disease or a family history of kidney issues should reduce their sodium intake, as it can help ease the workload on the kidneys.</p>
  <br/>

  <p><b>3. Bone Health</b></p>
  <p><b>Effect:</b> A high-sodium diet can lead to calcium loss in urine, which may weaken bones over time and increase the risk of osteoporosis.</p>
  <p><b>Best Practice:</b> Try using alternatives like flake salt or very small amounts of finishing salts. Adding calcium-rich ingredients, such as dairy or leafy greens, can support bone health while using less salt overall.</p>
  <p><b>Health Note:</b> Older adults, women post-menopause, and those at risk of osteoporosis may benefit from a lower sodium intake to help maintain strong bones.</p>
  <br/>

  <p><b>4. Fluid Retention and Swelling</b></p>
  <p><b>Effect:</b> Sodium retains water, leading to fluid buildup in tissues. This can cause swelling, especially in the hands, feet, and legs, and may worsen heart conditions by adding extra pressure to the cardiovascular system.</p>
  <p><b>Best Practice:</b> Use fresh herbs, spices, and acids (like vinegar or citrus) in place of salt-heavy seasonings. These ingredients add flavour without causing water retention.</p>
  <p><b>Health Note:</b> People prone to bloating, fluid retention, or with heart failure may benefit from reducing sodium to alleviate swelling.</p>
  <br/>

  <p><b>5. Salt Sensitivity</b></p>
  <p><b>Effect:</b> Certain people, due to genetics, are more “salt-sensitive,” meaning their blood pressure can rise more sharply with salt intake. This sensitivity is common among specific populations.</p>
  <p><b>Best Practice:</b> Limit the use of added salt in cooking and choose low-sodium options. Try adding umami-rich ingredients like tomatoes or mushrooms to dishes to enhance flavour without extra sodium.</p>
  <p><b>Health Note:</b> African Americans, older adults, and people with a family history of high blood pressure may be more salt-sensitive and should monitor their sodium intake closely.</p>
</section>
<br/>
<br/>
<section className='summary-and-practical-tips_section'>
  <h4 id='summary-and-practical-tips'>Summary and Practical Tips</h4>
  <h5>Key Takeaways</h5>

  <p><b>1. Choosing the Right Salt for the Right Purpose</b></p>
  <ul>
    <li><b>Best Salt Uses:</b> Table salt is ideal for baking due to its fine texture, kosher salt is preferred for seasoning meats because of its coarse flakes, and sea salt or Himalayan pink salt adds a delicate finishing touch to salads, roasted vegetables, and grilled foods.</li>
    <li><b>Practical Tip:</b> Match the salt type to the dish you are preparing to enhance flavour without overdoing sodium.</li>
  </ul>

  <p><b>2. Using Salt in Moderation</b></p>
  <ul>
    <li><b>Why It Matters:</b> Regardless of texture, flavour, or mineral content, all salts contain high sodium levels, which can affect blood pressure, kidney health, and more when consumed in excess.</li>
    <li><b>Practical Tip:</b> Start with a small amount of salt and taste as you go. Remember, it is easier to add salt than to remove it, so seasoning carefully helps keep sodium intake in check.</li>
  </ul>

  <p><b>3. Exploring Low-Sodium Alternatives</b></p>
  <ul>
    <li><b>Options for Reducing Sodium:</b> For those who need to lower sodium intake, potassium-based salt substitutes mimic the taste of salt without adding sodium. Herbal salt blends, made from dried herbs and spices, are another flavourful option for those seeking a reduced-sodium diet.</li>
    <li><b>Practical Tip:</b> Use herbs, spices, citrus, and vinegar to add flavour naturally. These ingredients reduce the need for salt while enhancing taste, giving meals depth without extra sodium.</li>
  </ul>

  <p><i>Image Suggestion:</i> A visual layout of salt types with clear labels indicating their primary uses (e.g., “Table Salt: Best for Baking,” “Kosher Salt: Best for Meat Seasoning,” “Sea Salt: Best for Finishing”), along with a reminder to use salt sparingly and consider alternative seasonings.</p>

    <br/>
  <h4>Sources</h4>
  <ul>
    <li><b>American Heart Association. (2021):</b> Sodium and Kids: The Facts. <a href="https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sodium" target="_blank" rel="noopener noreferrer">Retrieved from www.heart.org</a></li>
    <li><b>Centers for Disease Control and Prevention (CDC). (2022):</b> Get the Facts: Sodium and the Dietary Guidelines. <a href="https://www.cdc.gov/salt/pdfs/sodium_dietary_guidelines.pdf" target="_blank" rel="noopener noreferrer">Retrieved from www.cdc.gov</a></li>
    <li><b>National Institutes of Health (NIH). (2020):</b> Sodium in Your Diet: Use the Nutrition Facts Label and Reduce Your Intake. <a href="https://www.nhlbi.nih.gov/health/educational/wecan/eat-right/sodium.htm" target="_blank" rel="noopener noreferrer">Retrieved from www.nhlbi.nih.gov</a></li>
    <li><b>World Health Organization (WHO). (2021):</b> Reducing Salt Intake to Reduce Hypertension and Cardiovascular Disease. <a href="https://www.who.int/news-room/fact-sheets/detail/salt-reduction" target="_blank" rel="noopener noreferrer">Retrieved from www.who.int</a></li>
    <li><b>Harvard T.H. Chan School of Public Health. (2022):</b> The Nutrition Source: Salt and Sodium. <a href="https://www.hsph.harvard.edu/nutritionsource/salt-and-sodium/" target="_blank" rel="noopener noreferrer">Retrieved from www.hsph.harvard.edu</a></li>
    <li><b>Mayo Clinic. (2021):</b> Sodium: How to Tame Your Salt Habit Now. <a href="https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/sodium/art-20045479" target="_blank" rel="noopener noreferrer">Retrieved from www.mayoclinic.org</a></li>
    <li><b>National Kidney Foundation. (2022):</b> How Salt Intake Impacts Kidney Health. <a href="https://www.kidney.org/atoz/content/sodium-how-reduce" target="_blank" rel="noopener noreferrer">Retrieved from www.kidney.org</a></li>
    <li><b>Journal of the Academy of Nutrition and Dietetics. (2020):</b> Salt and Sodium Intake and Its Health Effects. <a href="https://jandonline.org/" target="_blank" rel="noopener noreferrer">Retrieved from jandonline.org</a></li>
  </ul>
</section>

{isReading && <div className='d-flex align-items-center justify-content-center'><div style={{gap:10,width:100}}  className='bottomReadingNav d-flex align-items-center justify-content-around'>
<IconButton disabled={currentContentIndex <=0}  onClick={goToPrevChild} style={{width:40,height:40,background:currentContentIndex<=0 ? "gray":"white"}}>
 <FaArrowLeft color="rgb(0, 77, 64)" size={15}/>
</IconButton>

<IconButton disabled={currentContentIndex >= preference.length-1} onClick={goToNextChild} style={{width:40,height:40,background:currentContentIndex >= preference.length-1 ? 'gray':"white"}}>
  <FaArrowRight color="black"  size={15}/>
</IconButton>
</div>
</div>}


{/* scrollable content ends here */}
</div>
</div>
</div>)
}

export default Beginner_Guide_to_Salt;