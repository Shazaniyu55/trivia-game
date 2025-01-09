import React, { useEffect, useRef, useState } from 'react';
// import PreferencesDropdown from './preferenceDropDown';
import {Divider, IconButton } from '@mui/material';


import { Button} from '@mui/material';
// import PreferencesDropdown from './preferenceDropDown';
import { parrentHeading } from './The_Basics_of_Sodium_and_Health';
import HeadingListComponent from './HeadingListComponent';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


import ScrollBar from 'react-perfect-scrollbar';
const Guide_for_People_of_African_Descent: React.FC = () => {
    const preference = [
        { title: "Salt and High Blood Pressure", link: "#salt-and-high-blood-pressure" },
        { title: "Cultural Influences on Diet", link: "#cultural-influences-on-diet" },
        { title: "Access to Healthy Food", link: "#access-to-healthy-food" },
        { title: "Practical Tips for Reducing Salt", link: "#practical-tips-for-reducing-salt" },
        { title: "Health Action Plan for Salt Reduction", link: "#health-action-plan" },
        { title: "Traditional Dishes and Hidden Salt Sources", link: "#traditional-dishes-hidden-salt-sources" },
        // { title: "Shopping for Lower-Salt Options", link: "#shopping-for-lower-salt-options" },
        // { title: "Adding Flavour Without Salt", link: "#adding-flavour-without-salt" },
        // { title: "Making Healthier Choices When Eating Out", link: "#making-healthier-choices-when-eating-out" },
        { title: "Setting Achievable Goals", link: "#setting-achievable-goals" },
        { title: "Taking Actionable Steps Towards Salt Reduction", link: "#taking-actionable-steps-towards-salt-reduction" },
        { title: "Tracking Progress and Seeking Support", link: "#tracking-progress-seeking-support" },
        { title: "Creating Your Personal Salt Reduction Plan", link: "#creating-your-personal-salt-reduction-plan" },
      
      ];
      
  


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
        <b className='header'> A Simple Guide for people of African decent in UK
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
  setCurrentContentIndex(i)
      showChildren(e)
    }}/>
    })}
    
    </div>}
    
    
    <div className='scrollable-content' style={{display:!isReading ? `none` :``,maxHeight:'68vh' }} ref={scrollableContentRef}>
<br/>

    <div>
      <section className="salt-and-high-blood-pressure_section">
        <h4 id='salt-and-high-blood-pressure'>Salt and High Blood Pressure</h4>



        <b>Content:</b><br/>
        <p>High blood pressure, also known as hypertension, is a medical condition that occurs when the force of blood pushing against the walls of your blood vessels is consistently too high. This can cause damage to the walls of your blood vessels over time, just like how high pressure can damage the walls of pipes.</p>
        <p>One of the main reasons why blood pressure can become too high is because of excessive salt intake. When we eat too much salt, our kidneys do not work as well and are unable to remove the extra salt from our bloodstream. This causes an imbalance in our body's fluid levels, which increases the amount of blood in our arteries and raises our blood pressure.</p>
        <p>The long-term effects of high blood pressure can be very serious and can lead to heart disease, stroke, and kidney damage. It is important to note that high blood pressure often does not show any noticeable symptoms, so it is crucial to have it checked regularly by a doctor. Therefore, reducing salt intake is very important for managing blood pressure and maintaining overall cardiovascular health.</p>
      </section>
      <br/>

      <section className="cultural-influences-on-diet_section">
        <h4 id='cultural-influences-on-diet'>Cultural Influences on Diet</h4>

        <b>Content:</b><br/>

        <p>Different cultures have unique ways of cooking and eating, and one of the most common ingredients used in many African and Afro-Caribbean cuisines is salt. From stews to jerk chicken, salt is used to bring out the rich flavours of these traditional dishes. Celebrations and social gatherings in these cultures are often marked by the presence of salty foods, which are an important part of their cultural identity and community bonding.</p>
        <p>It is essential to understand that these culinary traditions are not just about food but are also deeply connected to a community's identity and history. So, reducing or changing the use of salt in these dishes can be a sensitive issue, as it might feel like a loss of cultural authenticity. However, it is possible to appreciate and preserve cultural heritage while still making healthier choices. People can use different spices and herbs to add flavour to their food and try new recipes that use less salt. It is all about finding a balance between honouring traditions and promoting good health.</p>
      </section>
      <br/>

      <section className="access-to-healthy-food">
        <h4 id='access-to-healthy-food'>Access to Healthy Food</h4>
        <b>Content:</b><br/>

        <p>In some places, people have trouble finding and buying fresh and healthy food that is affordable and easy to get. Because of this, they end up eating mostly processed and unhealthy foods that have a lot of salt. It is essential to help people have better access to healthy foods. We can do this by bringing more stores and markets that sell fresh food to areas where it is hard to find, or by encouraging farmers to grow and sell fresh fruits and veggies. We can also teach people how to cook healthy meals that do not cost a lot of money.</p>
        <p>By doing all of this, we can help people make better choices about what they eat, and that will make our communities stronger and healthier.</p>
        <p><strong>Key Takeaway:</strong> Recognising the importance of salt reduction for health, while respecting cultural preferences and dietary habits, is crucial for well-being.</p>
      </section>
<br/>
      <section className="traditional-dishes-hidden-salt-sources_section">
        <h4 id='traditional-dishes-hidden-salt-sources'>Traditional Dishes and Hidden Salt Sources</h4>

        <b>Content:</b><br/>

        <p>Many African and Afro-Caribbean dishes are known for their rich and flavourful taste. However, most of these dishes contain high amounts of salt, which can be harmful to our health. In fact, many of these dishes have hidden sources of salt that we are not aware of. Here are some examples:</p>
        <ul>
          <li><strong>Soups and Stews:</strong> Many traditional African soups and stews, such as egusi soup or peanut stew, often contain seasoning blends that are high in salt.</li>
          <li><strong>Sauces and Condiments:</strong> Sauces like shito (a Ghanaian hot pepper sauce) or suya spice mix (a Nigerian seasoning blend) can also contain a lot of salt.</li>
          <li><strong>Preserved Meats:</strong> Certain traditional meats, such as biltong (South African dried meat) or jerky, undergo preservation processes that involve salting, contributing to their high sodium content.</li>
          <li><strong>Fermented Foods:</strong> Fermented foods like ogi (Nigerian fermented cereal pudding) or injera (Ethiopian sourdough flatbread) may contain hidden salt used in the fermentation process.</li>
          <li><strong>Seasoning Blends:</strong> Many African spice blends, such as berbere (Ethiopian spice blend) or yassa seasoning (Senegalese spice blend), may contain salt as a primary ingredient.</li>
        </ul>
        <p>It is important to learn how to identify these hidden sources of salt, especially if we want to make healthier choices. One way to do this is by reading the ingredient lists of the foods we buy. Another way is by preparing dishes at home using fresh, whole ingredients instead of canned or processed foods.</p>
     
        <br/>

<div style={{fontStyle:"italic",fontSize:'small'}}>
 <b> Key Takeaway : </b> Understanding where salt hides in traditional foods empowers you to make healthier choices without sacrificing flavour.
  </div>

  <br/>
<br/>
      </section>
    </div>
 


    <div>
      <section className="practical-tips-for-reducing-salt">
        <h4 id='practical-tips-for-reducing-salt'>Practical Tips for Reducing Salt</h4>

        <p>Objective: Provide actionable advice on lowering salt intake in daily life, with a focus on shopping, cooking, and dining out.</p>
        <p>To maintain a balance between tradition and health, it is important to follow some practical tips for reducing salt intake. Here are some practical tips:</p>
        <ul>
          <li><b>Opt for Lower-Salt Options when Shopping:</b> When you go grocery shopping, choose fresh fruits and vegetables, lean meats, and whole grains. These foods are naturally low in sodium. Also, carefully read food labels to select products labeled "low sodium" or "no added salt."</li>
          <li><b>Find Ways to Add Flavour Without Salt:</b> Herbs and spices such as garlic, ginger, thyme, and others can be an excellent substitute for salt. You can also try experimenting with citrus juices, vinegar, and homemade spice blends for seasoning.</li>
          <li><b>Make Healthier Choices When Eating Out:</b> When dining out, search for restaurants that offer healthier options, such as grilled or steamed dishes. Request dressings and sauces on the side to control salt intake.</li>
          <li><b>Explore Different Cooking Techniques:</b> Grilling, roasting, and baking can bring out the natural flavours of ingredients without adding salt. By adopting these tips, you can reduce your salt intake without compromising taste or your health.</li>
        </ul>

<div style={{fontStyle:"italic",fontSize:'small'}}>

        <p><b>Key Takeaway:</b> Small changes like choosing fresh ingredients, reading labels, and using spices can significantly reduce your sodium intake.</p>
        </div>
      </section>
<br/>
      <section className="creating-your-personal-salt-reduction-plan_section">
        <h4 id='creating-your-personal-salt-reduction-plan'>Creating Your Personal Salt Reduction Plan</h4>
        <p>Objective: Guide readers to develop a tailored plan for salt reduction, including setting goals and tracking progress.</p>
        <ul>
          <li><b id='setting-achievable-goals'>Setting Achievable Goals:</b> Set specific and realistic goals for reducing salt intake, considering cultural preferences and traditions. Gradually reduce the amount of salt added to meals to help your taste buds adjust.</li>
          <li><b>Involve family members and friends in setting goals and supporting each other:</b> Involving your family and friends in the process can be a great source of encouragement. They can help you stay accountable and motivated.</li>
          <li><b>Celebrate progress and milestones along the way:</b> When you hit a milestone, reward yourself with something you enjoy. This will help you stay on track and keep pushing towards your goal.</li>
        </ul>
      </section>
<br/>
      <section className="taking-actionable-steps-towards-salt-reduction_section">
        <h4 id='taking-actionable-steps-towards-salt-reduction'>Taking Actionable Steps Towards Salt Reduction</h4>
        <ul>
          <li><b>Start by gradually reducing salt in cooking and at the table:</b> Use alternatives such as herbs, spices, and other seasonings to add flavour to meals. Experiment with new recipes and flavours.</li>
          <li><b>Explore culturally diverse salt-free seasonings and cooking techniques:</b> Try using lemon juice, vinegar, or other acidic ingredients to add tanginess. Use salt-free seasoning blends like herbs de Provence or curry powder for added flavour.</li>
          <li><b>Find support from health professionals, community resources, and online communities:</b> Seek support from health professionals like doctors or dietitians, as well as from community resources or online groups that focus on healthy eating.</li>
        </ul>
      </section>
<br/>
      <section className="tracking-progress-and-seeking-support_section">
        <h4 id='tracking-progress-seeking-support'>Tracking Progress and Seeking Support</h4>
        <ul>
          <li><b>Keep a food diary:</b> This is a great way to monitor your salt intake and track your progress towards your goals.</li>
          <li><b>Seek support:</b> It is important to have a support system to help you stay motivated and accountable. This can be family, friends, or community groups.</li>
          <li><b>Celebrate successes and learn from setbacks:</b> Acknowledge your successes and keep moving forward. Learn from any setbacks and continue with your progress.</li>
        </ul>


<br/>

<div style={{fontStyle:"italic",fontSize:'small'}}>
 <b> Key Takeaway: </b>
 Personalising your approach makes salt reduction achievable and sustainable, with support from family, friends, and community.

  </div>

      </section>
    </div>
 

 
<br/>

    <div>
      <section className="health-action-plan_section">
        <h4 id='health-action-plan'>Health Action Plan for Salt Reduction</h4>
        <p>Objective: Outline a structured approach for readers to reduce salt, monitor their progress, and find support.</p>
        <p>Setting clear goals and taking actionable steps are important to reduce salt intake and improve overall health. Here is a simple health action plan that can be used by anyone who wants to reduce their salt intake:</p>
        
        <h5><b>1. Set Specific Goals:</b></h5>
        <ul>
          <li>Decide how much salt you want to consume each day, and keep in mind that adults should aim to consume less than 6 grams of salt per day.</li>
          <li>Consider your food preferences and habits when setting goals to make them achievable and realistic.</li>
        </ul>
        <br/>

        <h5><b>2. Create an Actionable Plan:</b></h5>
        <ul>
          <li>Start by finding out how much salt you're currently consuming and identify sources of hidden salt in your diet, such as processed foods or cooking methods.</li>
          <li>Plan your meals around fresh, whole foods and try to use lower-salt alternatives to traditional dishes that are culturally appropriate.</li>
          <li>Experiment with different cooking techniques and flavourings, like herbs, spices, or citrus, to reduce the need for salt.</li>
          <li>Make time for meal preparation and cooking to ensure that healthier options are readily available and convenient.</li>
        </ul>
        <br/>

        <h5><b>3. Track Your Progress:</b></h5>
        <ul>
          <li>Keep a diary of the food you eat every day and note how much salt you consume to monitor your progress.</li>
          <li>Regularly check food labels and nutritional information to make informed choices when grocery shopping.</li>
          <li>Use a blood pressure monitor to track changes in your blood pressure levels over time as you reduce salt intake.</li>
        </ul>
        <br/>

        <h5><b>4. Seek Support and Accountability:</b></h5>
        <ul>
          <li>Tell your friends and family about your goals and progress to get support and encouragement from them.</li>
          <li>Consider joining a support group or online community focused on salt reduction and cardiovascular health to connect with others facing similar challenges.</li>
          <li>Talk to a healthcare professional, like a nutritionist, for personalised guidance and advice on managing salt intake and improving overall health.</li>
        </ul>
        <br/>

        <h5><b>5. Regular Follow-Up and Adjustment:</b></h5>
        <ul>
          <li>Check in with yourself regularly to review your progress and adjust your action plan as needed.</li>
          <li>Celebrate your achievements and milestones along the way to stay motivated and committed to your salt reduction goals.</li>
          <li>Be flexible and open to making changes to your plan based on feedback and new information. Continuously strive for improvement in your dietary habits and overall well-being.</li>
        </ul>
        <br/>

        <h4>Salt Reduction Goal-Setting and Tracking Templates</h4>
        <p>In addition to the action plan above, please see the templates in the appendix to help you set achievable goals, monitor your daily progress, and make gradual changes toward a lower-sodium lifestyle.</p>

        <div style={{fontStyle:"italic",fontSize:'small'}}>
          <b>Key Takeaway:</b> Personalising your approach makes salt reduction achievable and sustainable, with support from family, friends, and community.
        </div>
     
<br/>
<br/>
<ScrollBar style={{width:'100%'}}>

<div>
      <h4>1. Salt Reduction Goal-Setting Template</h4>
      
      <table  style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}><b>Goal</b></th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}><b>Target Date</b></th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}><b>Progress Check Date</b></th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}><b>Completed (✔)</b></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Reduce salt in cooking by 50%</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1 month from today</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>2 weeks from today</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Switch to low-sodium seasoning blends</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>2 weeks from today</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1 week from today</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}></td>
          </tr>
        </tbody>
      </table>
    </div>
<br/><br/>
</ScrollBar>
<ScrollBar style={{width:'100%'}}>

    <div>
      <h4>2. Daily Tracking Log</h4>
      <p>Track your salt usage and note any substitutions with herbs or spices.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}><b>Date</b></th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}><b>Food/Dish</b></th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}><b>Salt Used</b></th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}><b>Herbs/Spices Substituted</b></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>2024-11-08</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Egusi Soup</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1 tsp</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Thyme, garlic</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>2024-11-09</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Grilled Chicken</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1/2 tsp</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Rosemary, lemon zest</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>2024-11-10</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Vegetable Stir Fry</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1/4 tsp</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Cumin, turmeric, black pepper</td>
          </tr>
        </tbody>
      </table>
    </div>



</ScrollBar>
<br/><br/>
<ScrollBar style={{width:'100%'}}>

<div>
      <h4>Weekly Reflection and Adjustments</h4>
      <p>Use the following table to reflect on your weekly progress and make necessary adjustments.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}><b>Reflection Area</b></th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}><b>Notes</b></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>What went well this week?</b></td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>What challenges did I face?</b></td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>What adjustments can I make for next week?</b></td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}></td>
          </tr>
        </tbody>
      </table>
    </div>

</ScrollBar>




    <div>
      <h4>Resources and Further Information</h4>
      <p>To learn more about salt, health, and culturally sensitive dietary advice, explore the following resources:</p>
      <ul>
        <li><a href="https://www.bhf.org.uk" target="_blank" rel="noopener noreferrer">British Heart Foundation</a></li>
        <li><a href="https://www.worldhypertensionleague.org" target="_blank" rel="noopener noreferrer">World Hypertension League</a></li>
        <li><a href="https://www.cdc.gov" target="_blank" rel="noopener noreferrer">Centers for Disease Control and Prevention (CDC) - Sodium Facts</a></li>
        <li><a href="https://www.nhs.uk" target="_blank" rel="noopener noreferrer">National Health Service (NHS) - Salt and Your Diet</a></li>
        <li><a href="https://www.heartsafrica.org" target="_blank" rel="noopener noreferrer">HEARTS AFRICA</a></li>
      </ul>
    </div>
  






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



<br/>
<br/>

</div>
</div>

                </div>
                  );
                  };

                  export default Guide_for_People_of_African_Descent;