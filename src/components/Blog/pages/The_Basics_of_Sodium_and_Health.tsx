import React, { useEffect, useRef, useState } from 'react';
import '../blog.css'
import './style.css';

import { Button, Divider, IconButton } from '@mui/material';
// import PreferencesDropdown from './preferenceDropDown';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import HeadingListComponent from './HeadingListComponent';
// import { Navigate } from 'react-router-dom';


export interface parrentHeading{
  link:string,
  title:string,
  element:HTMLElement,
  children?:HTMLElement[] | null
}

const The_Basics_of_Sodium_and_Health: React.FC = () => {


    // const preference=[
    //     { title: "What is Sodium?", link: "#what-is-sodium" },
    //     { title: "How Much Sodium Do We Need?", link: "#how-much-sodium-do-we-need" },
    //     { title: "Health Risks of Too Much Sodium", link: "#health-risks-of-too-much-sodium" },
    //     { title: "Benefits of Reducing Sodium", link: "#benefits-of-reducing-sodium" },
    //     { title: "Practical Tips to Reduce Sodium Intake", link: "#practical-tips-to-reduce-sodium-intake" },
    //     { title: "Resources and References", link: "#resources-and-references" },
    //   ];
    const [preference] =useState([
      { title: "What is Sodium?", link: "#what-is-sodium" },
      { title: "How Much Sodium Do We Need?", link: "#how-much-sodium-do-we-need" },
      { title: "Health Risks of Too Much Sodium", link: "#health-risks-of-too-much-sodium" },
      { title: "Glossary of Terms", link: "#Glossary_of_Terms" },
      { title: "Why Do We Need Sodium?", link: "#Why_Do_We_Need_Sodium" },
      //
      { title: "Benefits of Reducing Sodium", link: "#benefits-of-reducing-sodium" },
      { title: "Practical Tips to Reduce Sodium Intake", link: "#practical-tips-to-reduce-sodium-intake" },
      { title: "Resources and References", link: "#resources-and-references" }
    ]);

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

  return (
      <div className='body'>
            <div className='blogPage'>
            <b className='header'>The Basics of Sodium and Health
                </b>
 <Divider/>

 <div className='d-flex justify-content-between' style={{gap:5}}>
<div className='searchInput' style={{flexGrow:'1'}}>
<input onChange={handleSearchChange} placeholder='Search resources'/>
</div>
{/* <PreferencesDropdown preference={preference}/> */}
</div>


{isReading && <>
  <div className='d-flex align-items-center'>
<Button onClick={()=>setIsReading(false)} style={{width:`100%`,color:`white`,marginTop:5,gap:5,borderRadius:30,background:`radial-gradient(circle, var(--yellow),var(--bg))`}} className={`d-flex align-items-center`}> <FaArrowLeft/>  Content list</Button>
  </div>
</>}

{/* <br/> */}
{!isReading && <div className='scrollable-content'>

{section_headingList.map((e:parrentHeading,i:number)=>{
const text=e.title;
return <HeadingListComponent setSection_HeadingList={setSection_HeadingList} key={i} item={e} text={text} open={open} click={()=>{showChildren(e)
  setCurrentContentIndex(i)
}}/>
})}

</div>}


<div className='scrollable-content' style={{display:!isReading ? `none` :`` }}  ref={scrollableContentRef}>


<br/>
<section className='Glossary_of_Terms_section'>
  <b id='Glossary_of_Terms'>Glossary of Terms</b>
  <dl>
    <b>Sodium:</b>
    <dd>A mineral essential for body functions like fluid balance, nerve function, and muscle movement.</dd>
    
    <b>Electrolyte:</b>
    <dd>A substance that carries an electric charge, essential for functions like muscle movement and fluid balance.</dd>
    
    <b>Processed Foods:</b>
    <dd>Foods that have been altered from their natural state, often containing added sodium for flavor or preservation.</dd>
    
    <b>Low-Sodium Label:</b>
    <dd>A designation on food packaging indicating reduced sodium content, useful for managing salt intake.</dd>
    
    <b>Hypertension:</b>
    <dd>Another term for high blood pressure, which can be affected by sodium intake.</dd>
    
    <b>Hidden Sodium:</b>
    <dd>Sodium added to processed foods that may not be immediately noticeable, often present in items like sauces, bread, and snack foods.</dd>
  </dl>
</section>
<section className='
what-is-sodium_section'>
<br/>
<b id="what-is-sodium">What is Sodium?</b><br/>
<b>Objective</b>
<br/>
<span>
To understand what sodium is, why it’s essential, and the difference between sodium and salt.
</span>

<br/>
<br/>
<span>Sodium is a mineral that keeps our bodies functioning well. Combined with chlorine, it forms table salt, also called sodium chloride. Sodium is known as an “electrolyte” because it helps transmit electrical signals in the body, supporting many important functions.<br/>People often use “salt” and “sodium” interchangeably, but they’re different. Table salt is made up of about 40% sodium and 60% chloride. Sodium is one part of salt, and most of the sodium we eat comes from salt in foods.</span>

<br/>
<br/>
</section>
<section className='Why_Do_We_Need_Sodium_section'>
  <h4 id="Why_Do_We_Need_Sodium">Why Do We Need Sodium?</h4>
  <ul>
    <li>
      <strong>Fluid Balance:</strong> Sodium helps the body keep the right amount of fluids, which is key for controlling blood pressure.
    </li>
    <li>
      <strong>Nerve and Muscle Function:</strong> Sodium helps send signals in our nerves, allowing us to move our muscles and feel sensations.
    </li>
    <li>
      <strong>Teamwork with Potassium:</strong> Sodium and potassium work together to keep our cells healthy by balancing acid and base levels, moving nutrients into cells, and getting waste out.
    </li>
  </ul>
<br/>
  <h4>Everyday Sources of Sodium</h4>
  <ul>
    <li>
      <strong>In Cooking:</strong> Table salt is a staple in kitchens worldwide. It enhances flavors, preserves food, and is often used in food curing.
    </li>
    <li>
      <strong>In Industry:</strong> Sodium compounds, like baking soda, are also used in baking, cleaning, and fire extinguishers.
    </li>
  </ul>
  <br/>
  <div style={{fontStyle:"italic",fontSize:'small'}}>
 <b> Key Takeaway : </b>
Sodium is essential for health, but too much can be harmful. The following sections will explain how to manage sodium intake for a healthier lifestyle.

  </div>
<br/>
  <h4>Sources</h4>
  <ul>
    <li>
      <strong>Centers for Disease Control and Prevention. (2020).</strong> 
      Sodium: The Facts. 
      <a href="https://www.cdc.gov/salt/facts.htm" target="_blank" rel="noopener noreferrer">
        Retrieved from www.cdc.gov/salt/facts.htm
      </a>
    </li>
    <li>
      <strong>American Heart Association. (2021).</strong> 
      How much sodium should I eat per day? 
      <a href="https://www.heart.org/sodium" target="_blank" rel="noopener noreferrer">
        Retrieved from www.heart.org/sodium
      </a>
    </li>
  </ul>

<br/>

</section>


<section>
  <b id='how-much-sodium-do-we-need'>How Much Sodium Do We Need?</b>
  <br/>

  <b>Objective</b>
  <p>To understand the daily recommended sodium limit and identify common sources of sodium in our diets.</p>
<br/>
  <b>Sodium Intake Guidelines</b>
  <p>
    Understanding sodium guidelines from major health organisations can help you make informed decisions about your daily intake. Here are the current recommendations from the World Health Organisation (WHO), American Heart Association (AHA), and United Kingdom’s National Health Service (NHS):
  </p>
  <br/>

  <ol>
    <li>
      <h4>World Health Organization (WHO)</h4>
      <p><strong>Guideline:</strong> Adults should consume less than 2,000 mg of sodium per day (about 5 grams or 1 teaspoon of salt). Children’s limits are proportionally lower based on age and energy needs.</p>
      <p><strong>Goal:</strong> Reduce the risk of high blood pressure, stroke, and cardiovascular disease.</p>
    </li>
    <br/>

    <li>
      <h4>American Heart Association (AHA)</h4>
      <p><strong>Guideline:</strong> Ideally, adults should limit sodium intake to no more than 1,500 mg per day, especially those at risk for high blood pressure. The general upper limit is set at 2,300 mg per day.</p>
      <p><strong>Goal:</strong> Lowering sodium to 1,500 mg can significantly reduce blood pressure and improve heart health.</p>
    </li>
    <br/>

    <li>
      <h4>United Kingdom’s National Health Service (NHS)</h4>
    <br/>
      <p><strong>Guideline:</strong> The NHS advises no more than 2,400 mg of sodium daily for adults (equivalent to about 6 grams of salt). Children’s limits vary by age.</p><br/>
      <p><strong>Goal:</strong> To help prevent high blood pressure and heart disease through manageable dietary changes.</p>
    </li>
  </ol>
  <br/>

  <p>
    These guidelines highlight the importance of reducing sodium intake to prevent health risks like high blood pressure and cardiovascular disease. Although specific recommendations vary, all three organisations agree on limiting sodium to improve heart and overall health. For most people, following these guidelines means cutting back on processed foods and choosing fresh options whenever possible.
  </p>


  
<br/>
<br/>
</section>

<section>
  <h4>Common Sources of Sodium</h4>

  <h4>Processed and Packaged Foods</h4>
  <p>
    Around 70% of the sodium in our diets comes from processed foods, such as:
  </p>
  <ul>
    <li>Canned soups and vegetables</li>
    <li>Cheese and processed meats (like deli meats, suya, and bacon)</li>
    <li>Breads, rolls, and frozen meals</li>
    <li>Snack foods like chips, crackers, and pretzels</li>
  </ul>
  <br/>

  <h4>Eating Out</h4>
  <p>
    Many restaurant meals are high in sodium because of added sauces, marinades, and seasoned salts.
  </p>
</section>
<br/>
<section>
  <h4>Common Sources of Sodium</h4>
<br/>
  <b>Processed and Packaged Foods</b>
  <p>
    Around 70% of the sodium in our diets comes from processed foods, such as:
  </p>
  <ul>
    <li>Canned soups and vegetables</li>
    <li>Cheese and processed meats (like deli meats, suya, and bacon)</li>
    <li>Breads, rolls, and frozen meals</li>
    <li>Snack foods like chips, crackers, and pretzels</li>
  </ul>
<br/>
  <h4>Eating Out</h4>
  <p>
    Many restaurant meals are high in sodium because of added sauces, marinades, and seasoned salts.
  </p>
<br/>

</section>


<section>
  <h4>How to Read Food Labels for Sodium Content</h4>
<br/>
  <h4>Look for these terms to make informed choices:</h4>
  <ul>
    <li>
      <strong>Low Sodium:</strong> 140 mg or less per serving
    </li>
    <li>
      <strong>Very Low Sodium:</strong> 35 mg or less per serving
    </li>
    <li>
      <strong>% Daily Value (%DV):</strong> This tells you how much of your daily sodium limit a serving of food contains. 
      A %DV of <strong>5% or less</strong> is low; <strong>20% DV or more</strong> is high.
    </li>
  </ul>
  <br/>
<div style={{fontStyle:'italic'}}>
  <b>Key Takeaway : </b>
  <p>
    Reading food labels can help you control sodium intake and make healthier choices.
  </p>
  </div>
  <br/><br/>

</section>


<section>
  <h4>Sources</h4>
  <ol style={{listStyle:'initial'}}>
    <li>
      <strong>American Heart Association. (2021).</strong> 
      How much sodium should I eat per day? 
      <a href="https://www.heart.org/sodium" target="_blank" rel="noopener noreferrer">
        Retrieved from www.heart.org/sodium
      </a>
    </li>
    <li>
      <strong>Centers for Disease Control and Prevention. (2020).</strong> 
      Sodium: The Facts. 
      <a href="https://www.cdc.gov/salt/facts.htm" target="_blank" rel="noopener noreferrer">
        Retrieved from www.cdc.gov/salt/facts.htm
      </a>
    </li>
    <li>
      <strong>National Health Service. (2019).</strong> 
      Salt: the facts. 
      <a href="https://www.nhs.uk/live-well/eat-well/salt-nutrition/" target="_blank" rel="noopener noreferrer">
        Available at: https://www.nhs.uk/live-well/eat-well/salt-nutrition/
      </a>
    </li>
    <li>
      <strong>World Health Organization. (2012).</strong> 
      Guideline: Sodium intake for adults and children. Geneva: WHO Press. 
      <a href="https://www.who.int/publications/i/item/9789241504836" target="_blank" rel="noopener noreferrer">
        Available at: https://www.who.int/publications/i/item/9789241504836
      </a>
    </li>
  </ol>
  <br/>
<br/>
</section>

<section>
  <b id='health-risks-of-too-much-sodium'>Health Risks of Too Much Sodium</b>
<br/>
  <h4>Objective</h4>
  <p>To learn about the serious health effects of consuming too much sodium.</p>
  <br/>

  <h4>Health Risks of High Sodium Intake</h4>
  <ol>
    <li>
      <strong>High Blood Pressure (Hypertension):</strong> Eating too much sodium causes the body to retain extra water, which raises blood pressure. This can damage blood vessels, increasing the risk of heart issues.
    </li>
    <li>
      <strong>Heart Disease:</strong> High blood pressure from excess sodium can lead to heart disease, including heart attacks and heart failure.
    </li>
    <li>
      <strong>Kidney Damage:</strong> The kidneys filter out sodium. Too much sodium overworks them, which can lead to kidney disease or failure over time.
    </li>
    <li>
      <strong>Bone Health (Osteoporosis):</strong> High sodium intake can cause the body to lose calcium, a key mineral for bone strength, potentially leading to osteoporosis, especially in older adults.
    </li>
  </ol>
  <br/>

  <b>At-Risk Groups</b>
  <p>Some people are more sensitive to sodium:</p>
  <ul>
    <li>Those with high blood pressure, diabetes, or kidney disease</li>
    <li>Older adults</li>
    <li>People of African descent, who may experience more severe effects from sodium</li>
  </ul>
  <br/>
  <div style={{fontStyle:"italic",fontSize:'small'}}>
 <b> Key Takeaway : </b>
 Too much sodium raises the risk of health issues such as heart disease, kidney damage, and weakened bones.

  </div>
<br/>
<h4>Sources</h4>
  <ul>
    <li>
      <strong>Mozaffarian, D., Fahimi, S., Singh, G. M., et al. (2014).</strong>
      Global sodium consumption and death from cardiovascular causes. 
      <i>The New England Journal of Medicine, 371(7), 624-634.</i>
    </li>
    <li>
      <strong>Nerbass, F. B., Pecoits-Filho, R., Mcintyre, N. J., et al. (2014).</strong>
      High sodium intake is associated with important risk factors in chronic kidney disease.
      <i>European Journal of Clinical Nutrition, 69, 786-790.</i>
    </li>
  </ul>

  <br/>

<br/>

</section>


<section>
  <h4 id='benefits-of-reducing-sodium'>Benefits of Reducing Sodium</h4>

  <b>Objective</b>
  <p>To understand the positive health outcomes of reducing sodium intake.</p>

  <b>Health Benefits of Lowering Sodium</b>
  <ul>
    <li>
      <strong>Lowers Blood Pressure:</strong> Studies show that reducing sodium can lower blood pressure, protecting the heart and blood vessels.
    </li>
    <li>
      <strong>Reduces Risk of Heart Disease:</strong> Lower sodium intake can help prevent heart disease and stroke, lowering long-term health risks.
    </li>
    <li>
      <strong>Protects Kidney Health:</strong> Lowering sodium reduces stress on the kidneys, which can prevent kidney disease.
    </li>
    <li>
      <strong>Strengthens Bones:</strong> By cutting back on sodium, you help your body retain calcium, which is vital for strong bones.
    </li>
  </ul>
<br/><br/>

</section>
<section>
  <h4 id='benefits-of-reducing-sodium'>Benefits of Reducing Sodium</h4>
<br/>
  <b>Objective</b>
  <p>To understand the positive health outcomes of reducing sodium intake.</p>
<br/>
  <h4>Health Benefits of Lowering Sodium</h4>
  <ul>
    <li>
      <strong>Lowers Blood Pressure:</strong> Studies show that reducing sodium can lower blood pressure, protecting the heart and blood vessels.
    </li>
    <li>
      <strong>Reduces Risk of Heart Disease:</strong> Lower sodium intake can help prevent heart disease and stroke, lowering long-term health risks.
    </li>
    <li>
      <strong>Protects Kidney Health:</strong> Lowering sodium reduces stress on the kidneys, which can prevent kidney disease.
    </li>
    <li>
      <strong>Strengthens Bones:</strong> By cutting back on sodium, you help your body retain calcium, which is vital for strong bones.
    </li>
  </ul>

  <br/>
  <div style={{fontStyle:"italic",fontSize:'small'}}>
 <b> Key Takeaway : </b>
 Reducing sodium intake is a simple way to improve heart, kidney, and bone health.

  </div>
<br/>
<b>Sources</b>
  <ul>
    <li>
      <strong>Jaques, D., Wuerzner, G., & Ponte, B. (2021).</strong> 
      Sodium Intake as a Cardiovascular Risk Factor: A Narrative Review. 
      <i>Nutrients, 13(9), 3177.</i>
    </li>
    <li>
      <strong>Kwon, S. J., Ha, Y., & Park, Y. (2017).</strong> 
      High dietary sodium intake is associated with low bone mass in postmenopausal women. 
      <i>Osteoporosis International, 28, 1445-1452.</i>
    </li>
  </ul>
</section>
<br></br>
<section>
  <h4 id='practical-tips-to-reduce-sodium-intake'>Practical Tips to Reduce Sodium Intake</h4>

  <b>Objective</b>
  <p>To provide simple, actionable steps to help reduce sodium intake in daily life.</p>
<br/>
  <b>Tips to Lower Sodium</b>
  <ol>
    <li>
      <strong>Cook at Home:</strong> Preparing meals at home gives you control over salt levels. Use fresh ingredients and limit processed foods, which are often high in sodium.
    </li>
    <li>
      <strong>Check Food Labels:</strong> Look for “low sodium,” “reduced sodium,” or “no salt added” products to lower your intake.
    </li>
    <li>
      <strong>Use Herbs and Spices:</strong> Substitute salt with herbs, spices, vinegar, or lemon juice to add flavor without sodium.
    </li>
    <li>
      <strong>Choose Fresh Produce:</strong> Fresh fruits and vegetables are naturally low in sodium. For canned or frozen produce, choose no-salt options or rinse to reduce sodium.
    </li>
    <li>
      <strong>Be Careful When Eating Out:</strong> Ask for dishes without added salt and request sauces on the side. Choose baked, grilled, or steamed dishes over fried or breaded ones, which often contain more sodium.
    </li>
  </ol>
  <br/>
  <div style={{fontStyle:"italic",fontSize:'small'}}>
 <b> Key Takeaway : </b>
 By following these tips, you can significantly reduce your sodium intake and improve your overall health.

  </div>
  <br/>
  <b>Sources</b>
  <ul>
    <li>
      <strong>Doyle, M. E., & Glass, K. A. (2010).</strong> 
      Sodium Reduction and Its Effect on Food Safety, Food Quality, and Human Health. 
      <i>Comprehensive Reviews in Food Science and Food Safety, 9(1), 44-56.</i>
    </li>
  </ul>
  <br/>
  <div style={{fontStyle:"italic",fontSize:'small'}}>
 <b>Summary and Final Takeaway </b>
 Managing your sodium intake can lead to better blood pressure, heart health, stronger bones, and overall wellness. Small changes like choosing fresh foods, reading labels, and cooking at home can make a big difference

  </div>

  <br/>

</section>
<section>
  <b id='resources-and-references'>Resources and References</b>
  <p>For more information on sodium and health, visit these trusted resources:</p>
  <ul>
    <li><a href="https://www.cdc.gov" target="_blank" rel="noopener noreferrer">Centers for Disease Control and Prevention (CDC) - www.cdc.gov</a></li>
    <li><a href="https://www.heart.org" target="_blank" rel="noopener noreferrer">American Heart Association (AHA) - www.heart.org</a></li>
    <li><a href="https://www.heartsafrica.org" target="_blank" rel="noopener noreferrer">HEARTSAFRICA – www.heartsafrica.org</a></li>
  </ul>

<br/>

</section>
<section>
  <b>Final Thoughts</b>
  <p>
    Making healthier choices is easier when you’re informed. This booklet has provided you with the basics of sodium and health, showing how a few simple changes can make a big difference. Remember, managing sodium doesn’t mean losing flavour—it is about finding balance and discovering the natural tastes of fresh, wholesome foods. Use the practical tips and label-reading guidance in this booklet to keep sodium in check and support your heart, kidneys, and bones.
  </p>
  <p>
    For more resources on sodium and health, visit the trusted links provided in the Resources section.
  </p>
<br/>

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


</div>
{/* scrollable body ends here */}

            </div>
                </div>
                  );
                  };

                  export default The_Basics_of_Sodium_and_Health;