import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import '../blog.css'
import { Button, Divider, IconButton } from '@mui/material';
// import PreferencesDropdown from './preferenceDropDown';
import { parrentHeading } from './The_Basics_of_Sodium_and_Health';
import HeadingListComponent from './HeadingListComponent';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';



const preference = [
    { title: "Introduction to Sodium and Children’s Health", link: "#introduction-to-sodium-and-children-health" },
    { title: "Why Sodium Matters for Kids", link: "#why-sodium-matters-for-kids" },
    { title: "Glossary of Terms", link: "#Glossary_of_Terms" },
    { title: "Recommended Sodium Intake for Children by Age", link: "#recommended-sodium-intake-for-children-by-age" },
    { title: "Hidden Sources of Sodium in Kids’ Diets", link: "#hidden-sources-of-sodium-in-kids-diets" },
    { title: "Practical Tips for Reducing Sodium in Children’s Meals", link: "#practical-tips-for-reducing-sodium-in-children-meals" },
    { title: "Engaging Kids in Learning About Healthy Sodium Choices", link: "#engaging-kids-in-learning-about-healthy-sodium-choices" },
    { title: "Summary and Key Takeaways", link: "#summary-and-key-takeaways" },
    // { title: "References and Resources", link: "#references-and-resources" },
  ];


const HealthySaltIntakeForGrowingChildren: React.FC = () => {

  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query state
  const [debouncedSearch, setDebouncedSearch] = useState<string>(""); // Debounced search query state
  const scrollableContentRef = useRef<HTMLDivElement>(null); // Ref to scrollable content
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for debounced timeout

// Handle search input change and debounce the search query
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setSearchQuery(e.target.value);
if (searchTimeoutRef.current) {
  clearTimeout(searchTimeoutRef.current); // Clear previous timeout
}
searchTimeoutRef.current = setTimeout(() => {
  setDebouncedSearch(e.target.value);
}, 1000); // Wait for 1000ms after user stops typing
};

useEffect(() => {
if (debouncedSearch) {
  console.log(searchQuery,debouncedSearch)
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

const open = (heading: HTMLElement) => {
closeAll()
let parent = heading.parentElement;

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
  setSearchQuery(heading.innerText);
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
    <b className='header'>Sodium and Kids: A Comprehensive Guide to Healthy Salt Intake for Growing Children
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
return <HeadingListComponent setSection_HeadingList={setSection_HeadingList} key={i} item={e} text={text} open={open} click={()=>{showChildren(e)

  setCurrentContentIndex(i)
}}/>
})}

</div>}


<div className='scrollable-content' style={{display:!isReading ? `none` :``,maxHeight:'65vh' }} ref={scrollableContentRef}>
<br/>
<section className='Glossary_of_Terms_section'>
  <h4 id='Glossary_of_Terms'>Glossary of Terms</h4>
  <dl>
    <b><strong>Sodium:</strong></b>
    <dd>A mineral essential for various body functions, but too much can be harmful to health.</dd>

    <b><strong>Electrolytes:</strong></b>
    <dd>Minerals like sodium that help regulate body fluids, muscle function, and nerve signals.</dd>

    <b><strong>Processed Foods:</strong></b>
    <dd>Foods that have been altered from their natural state, often containing added salt for flavour or preservation.</dd>

    <b><strong>Low-Sodium Label:</strong></b>
    <dd>A label on food products indicating they contain a reduced amount of sodium, which is helpful for managing salt intake.</dd>

    <b><strong>Hypertension:</strong></b>
    <dd>Another term for high blood pressure, a condition that can be influenced by high sodium intake.</dd>

    <b><strong>Salt Sensitivity:</strong></b>
    <dd>A condition in which certain people’s blood pressure increases more significantly in response to sodium intake.</dd>

    <b><strong>Hidden Sodium:</strong></b>
    <dd>Sodium that is added to foods during processing, often in foods where it is not immediately obvious, such as bread or sauces.</dd>
  </dl>
<br/>

</section>
<section className='introduction-to-sodium-and-children-health_section'>
  <b id="introduction-to-sodium-and-children-health">Introduction to Salt, Sodium and Children’s Health</b>
<br/>
  <b>Objective</b>
  <p>Learn why sodium is important in a child’s body and why balanced intake matters.</p>
  <br/>
  <h4>Understanding Salt and Sodium</h4>
  <p>
    Salt, also known as sodium chloride, is made up of sodium and chloride. Sodium is the part that our bodies need in small amounts, but too much can be harmful. Though people often use "salt" and "sodium" as if they mean the same thing, it is actually the sodium in salt that affects our health.
  </p>
  <br/>
  <h4>Why Sodium is Important for Kids</h4>
  <p>
    Sodium is essential for several body functions. It helps keep fluids balanced in the body, supports muscles and nerves so they work properly, and helps maintain normal blood pressure. However, just like adults, children need only a small amount to stay healthy.
  </p>
  <br/>
  <h4>Why Too Much Sodium is Harmful</h4>
  <p>
    Many children consume more sodium than they need, often because of processed or packaged foods, which use salt for flavour and preservation. Eating too much sodium can lead to high blood pressure, even in kids. High blood pressure in childhood increases the chances of heart and kidney problems later in life.
  </p>
  <br/>
  <h4>Building Healthy Sodium Habits</h4>
  <p>
    By helping children develop healthy sodium habits early on, we can set them up for better health in the future. Choosing fresh foods more often and checking food labels to spot high-sodium foods are simple ways to start building these habits. Teaching children about sodium can help them make healthier choices as they grow up.
  </p>
<br/>

</section>
<section className='why-sodium-matters-for-kids_section'>
  <h4 id='why-sodium-matters-for-kids'> Why Sodium Matters for Kids</h4>
  <b>Objective:</b>
  <p>Understand the important roles sodium plays in children’s health and the risks of consuming too much.</p>

  <p>
    While sodium is essential for children’s health, too much of it can cause problems, especially in young, growing bodies.
  </p>

  <ul>
    <li>
      <b>Fluid Balance and Hydration:</b> Sodium helps keep fluids in balance, which is important for staying hydrated and making sure the body works well.
    </li>
    <li>
      <b>Nerve and Muscle Function:</b> Sodium supports the nervous system by helping carry electrical signals. This is essential for muscle movement and many other body functions.
    </li>
    <li>
      <b>Blood Pressure and Heart Health:</b> Too much sodium can raise blood pressure, even in children. High blood pressure over time can increase the risk of heart and kidney problems as they get older.
    </li>
    <li>
      <b>Building Healthy Habits Early:</b> Children’s taste preferences develop early, and reducing sodium can help them enjoy natural flavours without craving salty foods as they grow.
    </li>
  </ul>
  
<br/>
<br/>
</section>

<section className='recommended-sodium-intake-for-children-by-age_section'>
  <h4 id='recommended-sodium-intake-for-children-by-age'>Recommended Sodium Intake for Children by Age</h4>
  <b>Objective:</b>
  <p>Understand the recommended daily sodium limits for children to support healthy growth and prevent health issues.</p>

  <p>
    The NHS provides specific daily salt limits for children, which can help parents manage sodium intake effectively. These limits, shown below, help reduce health risks associated with high sodium intake, such as high blood pressure:
  </p>
  <br/>
  <h5>Sodium (Salt) Guidelines for Children</h5>
  <ul>
    <li><b>Ages 1-3:</b> No more than 2 grams of salt per day (0.8 grams of sodium).</li>
    <li><b>Ages 4-6:</b> No more than 3 grams of salt per day (1.2 grams of sodium).</li>
    <li><b>Ages 7-10:</b> No more than 5 grams of salt per day (2 grams of sodium).</li>
    <li><b>Ages 11 and older:</b> No more than 6 grams of salt per day (2.4 grams of sodium).</li>
  </ul>
  <br/>

  <h5>Why These Limits Matter</h5>

  <p>
    Following these guidelines supports children’s growth and reduces the likelihood of developing high blood pressure, which can lead to heart and kidney problems later. By keeping salt intake within these limits, children can develop healthier taste preferences that favour natural, low-sodium foods.
  </p>
  <br/>

  <h5>Practical Tips for Parents</h5>

  <ul>
    <li>Choose fresh foods, which naturally contain less salt.</li>
    <li>Check food labels, as many processed foods contain hidden sodium.</li>
    <li>Limit salty snacks and fast foods, which are often high in salt.</li>
  </ul>

<br/>

</section>
<section className='hidden-sources-of-sodium-in-kids-diets_section'>
  <h4 id='hidden-sources-of-sodium-in-kids-diets'>Hidden Sources of Sodium in Kids’ Diets</h4>

  <b>Objective:</b>
  <p>Help parents spot high-sodium foods often marketed to kids and choose healthier, lower-sodium options.</p>
<br/>
  <p>
    Many foods that seem kid-friendly actually contain a lot of hidden sodium. Learning to identify these foods can help parents make better choices for their children’s health.
  </p>
  <br/>

  <h5>Common High-Sodium Foods for Kids</h5>
  <ul>
    <li>
      <b>Processed Snacks:</b> Many snacks kids enjoy - like chips, crackers, pretzels, and even some cereals - can have surprisingly high sodium content. Sodium is often added for flavour or as a preservative.
    </li>
    <li>
      <b>Fast Food Favourites:</b> Kid-friendly fast foods like chicken nuggets, burgers, fries, and pizza often have high sodium levels due to the processing, sauces, and seasonings used.
    </li>
    <li>
      <b>Canned Soups and Vegetables:</b> Canned items, such as soups and vegetables, often have extra salt added to extend shelf life. These foods can contain much more sodium than fresh or frozen versions.
    </li>
    <li>
      <b>Condiments and Sauces:</b> Sauces like ketchup, salad dressings, soy sauce, and cheese spreads are often high in sodium. Even a small amount can add up quickly, especially when kids use them frequently.
    </li>
  </ul>
  <br/>

  <h5>Healthier Choices and Swaps</h5>
  <ul>
    <li>
      <b>Swap Salty Snacks:</b> Instead of chips and pretzels, try offering fresh fruits, veggies with hummus, or unsalted popcorn. These options are naturally lower in sodium and packed with nutrients.
    </li>
    <li>
      <b>Choose Low-Sodium or No-Salt-Added Options:</b> Look for “low-sodium” or “no salt added” versions of canned vegetables, soups, and broths. These are much healthier options for kids.
    </li>
    <li>
      <b>Use Healthier Dips:</b> Instead of high-sodium cheese spreads or creamy dressings, try plain Greek yogurt or guacamole as a dip. Both are nutritious and naturally lower in sodium.
    </li>
    <li>
      <b>Flavour with Herbs and Spices:</b> Use herbs and spices instead of salt to season foods. This can add flavour without adding sodium.
    </li>
  </ul>
<br/>

</section>

<section className='practical-tips-for-reducing-sodium-in-children-meals_section'>
  <h4 id='practical-tips-for-reducing-sodium-in-children-meals'>Practical Tips for Reducing Sodium in Children’s Meals</h4>
  <b>Objective:</b>
  <p>Learn simple ways to cut down on sodium in your child’s meals without losing flavour or enjoyment.</p>
  <br/>

  <p>
    Reducing sodium does not mean meals have to be bland. Here are easy strategies to help keep sodium levels low while keeping meals tasty:
  </p>
  <br/>

  <ul>
    <li>
      <b>Focus on Fresh, Whole Foods:</b> Base meals around fruits, vegetables, whole grains, and lean proteins like chicken and fish, which are naturally low in sodium. Fresh foods are naturally healthier and help lower sodium intake without effort.
    </li>
    <li>
      <b>Limit Processed Foods and Choose Wisely:</b> Processed and packaged foods often have high sodium levels, so choose unsalted or “no salt added” versions whenever possible. Prioritize fresh foods over processed ones to reduce sodium intake across meals.
    </li>
    <li>
      <b>Use Herbs, Spices, and Citrus for Flavour:</b> Swap out salt for flavourful herbs, spices, and citrus like lemon or lime juice. These add a burst of taste without the sodium, making meals more enjoyable for children while keeping them healthy.
    </li>
    <li>
      <b>Rinse Canned Foods:</b> Rinse canned vegetables, beans, and meats under running water to wash away some of the sodium. This simple step can cut sodium levels significantly.
    </li>
    <li>
      <b>Be Mindful When Eating Out:</b> When dining out, ask for low-sodium options or request sauces and dressings on the side. Choose grilled, baked, or steamed foods instead of fried options, as fried foods often contain extra sodium.
    </li>
    <li>
      <b>Watch Serving Sizes:</b> Sodium levels can add up quickly with larger portions. Stick to recommended serving sizes to keep sodium intake within healthy limits.
    </li>
  </ul>
<br/>

</section>
<section className='engaging-kids-in-learning-about-healthy-sodium-choices_section'>
  <h4 id='engaging-kids-in-learning-about-healthy-sodium-choices'>Engaging Kids in Learning About Healthy Sodium Choices</h4>

  <b>Objective:</b>
  <p>Make learning about sodium fun and help kids develop healthy habits.</p>
<br/>
  <p>
    Teaching kids about sodium can be enjoyable and interactive. Here are some creative ways to get them interested in making healthy choices:
  </p>
  <br/>

  <ul>
    <li>
      <b>Explain “Too Much Salt” Simply:</b> Use kid-friendly language to describe sodium’s impact, like explaining that too much salt makes the body “work harder” to stay healthy. This simple explanation helps kids understand why we need to limit salt.
    </li>
    <li>
      <b>Grocery Store Game:</b> Make shopping a fun activity by challenging kids to find “low sodium” or “no salt added” labels on food packages. This turns grocery shopping into a learning experience and helps kids recognize healthier options.
    </li>
    <li>
      <b>Salt Comparison Activity:</b> Show kids what sodium looks like by measuring out teaspoons of salt to represent the sodium content in various foods. This visual demonstration can help them understand just how much salt is in common foods and why it’s important to limit it.
    </li>
    <li>
      <b>Flavour Experiment:</b> Let kids explore alternatives to salt by seasoning foods with herbs, spices, or lemon juice. Make it a taste test where they can compare different flavours and vote on their favourites. This activity can teach them that food can taste great without extra salt.
    </li>
    <li>
      <b>Kid-Friendly Chart:</b> Create a fun home chart to track sodium “wins” for each meal. Reward choices like choosing water instead of a salty snack or picking fruit over chips. A points system or small rewards can encourage them to make healthier decisions.
    </li>
  </ul>
<br/>

</section>
<section className='summary-and-key-takeaways_section'>
  <h4 id='summary-and-key-takeaways'>Summary and Key Takeaways</h4>
  <ul>
    <li>
      <b>Know the Limits:</b> Follow the recommended daily sodium limits for each age group to keep your child’s sodium intake balanced and support their growth and health.
    </li>
    <li>
      <b>Spot Hidden Sodium:</b> Be aware of foods with hidden sodium, like processed snacks, sauces, and restaurant meals. Choose lower-sodium options and prioritize fresh foods to reduce unnecessary sodium.
    </li>
    <li>
      <b>Flavour Naturally:</b> Use herbs, spices, and citrus to add flavour to meals without salt. These natural seasonings keep food tasty and healthy.
    </li>
    <li>
      <b>Engage and Educate:</b> Involve kids in choosing, preparing, and learning about low-sodium foods. Making healthy eating interactive and enjoyable helps them build positive lifelong habits.
    </li>
  </ul>

  <h4>Sources</h4>
  <ul>
    <li>
      <strong>Centers for Disease Control and Prevention (CDC). (2021).</strong> 
      <a href="https://www.cdc.gov/salt/pdfs/sodium_kids.pdf" target="_blank" rel="noopener noreferrer">
        Sodium and Kids: What You Need to Know
      </a>
    </li>
    <li>
      <strong>American Heart Association (AHA). (2021).</strong> 
      <a href="https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sodium" target="_blank" rel="noopener noreferrer">
        Healthy Eating for Kids: Sodium and Salt Awareness
      </a>
    </li>
    <li>
      <strong>National Institutes of Health (NIH). (2020).</strong> 
      <a href="https://www.nhlbi.nih.gov/health/educational/wecan/eat-right/sodium.htm" target="_blank" rel="noopener noreferrer">
        We Can! Help Kids Eat Right – Sodium Intake and Recommendations
      </a>
    </li>
    <li>
      <strong>National Health Service (NHS).</strong> 
      <a href="https://www.nhs.uk/live-well/eat-well/food-types/salt-in-your-diet/" target="_blank" rel="noopener noreferrer">
        Salt: The Facts
      </a>
    </li>
    <li>
      <strong>Sorokowska, A., Pellegrino, R., Butovskaya, M., Marczak, M., Niemczyk, A., Huanca, T., & Sorokowski, P. (2017).</strong> 
      Dietary customs and food availability shape the preferences for basic tastes: A cross-cultural study among Polish, Tsimane' and Hadza societies. 
      <em>Appetite, 116, 291-296.</em>
    </li>
    <li>
      <strong>Drewnowski, A. (1997).</strong> 
      Taste preferences and food intake. <em>Annual Review of Nutrition, 17, 237-253.</em>
    </li>
  </ul>


<br/><br/>
  <h4>Resources and Additional Information</h4>
  <ul>
    <li>
      <strong>American Heart Association</strong> - Healthy Eating for Kids: 
      <a href="https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sodium" target="_blank" rel="noopener noreferrer">
        www.heart.org
      </a>
    </li>
    <li>
      <strong>Centers for Disease Control and Prevention (CDC)</strong> - Salt and Sodium: 
      <a href="https://www.cdc.gov/salt/" target="_blank" rel="noopener noreferrer">
        www.cdc.gov
      </a>
    </li>
    <li>
      <strong>National Health Service (NHS)</strong> - Salt and Health Facts: 
      <a href="https://www.nhs.uk/live-well/eat-well/food-types/salt-in-your-diet/" target="_blank" rel="noopener noreferrer">
        www.nhs.uk
      </a>
    </li>
    <li>
      <strong>National Institutes of Health (NIH)</strong> - We Can! Program for Healthy Eating: 
      <a href="https://www.nhlbi.nih.gov/health/educational/wecan/eat-right/sodium.htm" target="_blank" rel="noopener noreferrer">
        www.nih.gov
      </a>
    </li>
    <li>
      <strong>HEARTS AFRICA</strong> – 
      <a href="https://www.heartsafrica.org" target="_blank" rel="noopener noreferrer">
        www.heartsafrica.org
      </a>
    </li>
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
{/* end scrollable content */}
</div>
</div>
</div>
)
}
export default HealthySaltIntakeForGrowingChildren;