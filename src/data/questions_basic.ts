export interface options  {
    A: string;
    B: string;
    C?: string;
    D?: string;
  }

export interface QuizQuestion {
  question: string;
  options:options,
  feedback: string;
  correctAnswer: "A" | "B" | "C" | "D" | "True" | "False";
  mark?: number;
}

export const basic_questions: QuizQuestion[] = [
  {
    question: "What is the recommended daily sodium intake for adults?",
    options: {
      A: "1,500 mg",
      B: "2,300 mg",
      C: "3,000 mg",
      D: "4,000 mg",
    },
    correctAnswer: "B",
    mark: 1,
    feedback:
      "Correct! The recommended maximum sodium intake for adults is 2,300 mg, about 1 teaspoon of salt. Consuming less is even better for your health!",
  },
  {
    question: "Which organ is most affected by high salt consumption?",
    options: {
      A: "Liver",
      B: "Heart",
      C: "Kidneys",
      D: "Lungs",
    },
    correctAnswer: "C",
    mark: 1,
    feedback:
      "Correct! High salt intake puts stress on the kidneys, which work to filter excess sodium. Over time, this can lead to kidney damage.",
  },
  {
    question: "What is sodium's primary function in the body?",
    options: {
      A: "Providing energy",
      B: "Regulating fluid balance",
      C: "Repairing tissues",
      D: "Protecting bones",
    },
    correctAnswer: "B",
    mark: 1,
    feedback:
      "Correct! Sodium helps maintain fluid balance and supports muscle and nerve function. Too much sodium, however, disrupts this balance.",
  },
  {
    question: "Which of the following is considered a high-sodium food?",
    options: {
      A: "Fresh apples",
      B: "Plain bread",
      C: "Processed bacon",
      D: "Raw chicken",
    },
    correctAnswer: "C",
    mark: 1,
    feedback:
      "Correct! Processed meats like bacon are among the highest-sodium foods due to added salts and preservatives.",
  },
  {
    question: "What is the main source of sodium in most diets?",
    options: {
      A: "Table salt",
      B: "Packaged and processed foods",
      C: "Fresh vegetables",
      D: "Fruits",
    },
    correctAnswer: "B",
    mark: 1,
    feedback:
      "Correct! Over 70% of dietary sodium comes from packaged and processed foods, not table salt.",
  },
  {
    question: "What does the term “sodium-free” mean on a food label?",
    options: {
      A: "Less than 5 mg of sodium per serving",
      B: "Less than 50 mg of sodium per serving",
      C: "Zero sodium",
      D: "Less than 100 mg of sodium per serving",
    },
    correctAnswer: "A",
    mark: 1,
    feedback:
      "Correct! 'Sodium-free' means the product contains less than 5 mg of sodium per serving.",
  },
  {
    question: "How much sodium is in 1 teaspoon of table salt?",
    options: {
      A: "1,000 mg",
      B: "1,500 mg",
      C: "2,300 mg",
      D: "3,000 mg",
    },
    correctAnswer: "C",
    mark: 1,
    feedback:
      "Correct! One teaspoon of table salt contains about 2,300 mg of sodium, which is the daily limit for most adults.",
  },
  {
    question:
      "What health condition is most closely associated with high sodium intake?",
    options: {
      A: "Diabetes",
      B: "High blood pressure",
      C: "Asthma",
      D: "Osteoporosis",
    },
    correctAnswer: "B",
    mark: 1,
    feedback:
      "Correct! High sodium intake is strongly linked to high blood pressure, a major risk factor for heart disease and stroke.",
  },
  {
    question: "Which of these drinks is likely to have the least sodium?",
    options: {
      A: "Sports drinks",
      B: "Bottled water",
      C: "Canned vegetable juice",
      D: "Soda",
    },
    correctAnswer: "B",
    mark: 1,
    feedback:
      "Correct! Bottled water typically contains little to no sodium, unlike many other beverages.",
  },
  {
    question:
      "What percentage of daily sodium intake comes from processed foods?",
    options: {
      A: "25%",
      B: "50%",
      C: "70%",
      D: "90%",
    },
    correctAnswer: "C",
    mark: 1,
    feedback:
      "Correct! About 70% of dietary sodium comes from processed and restaurant foods, not table salt.",
  },
  {
    question: "Which of these is a naturally low-sodium food?",
    options: {
      A: "Fresh spinach",
      B: "Canned soup",
      C: "Processed bread",
      D: "Salami",
    },
    correctAnswer: "A",
    mark: 1,
    feedback:
      "Correct! Fresh vegetables like spinach are naturally low in sodium. Canned and processed foods often have added sodium.",
  },
  {
    question: "How can you tell how much sodium is in a food?",
    options: {
      A: "By looking at the ingredient list",
      B: "By checking the Nutrition Facts label",
      C: "By tasting it",
      D: "By its price",
    },
    correctAnswer: "B",
    mark: 1,
    feedback:
      "Correct! The Nutrition Facts label lists the amount of sodium per serving, helping you make informed choices.",
  },
  {
    question:
      "Which health problem can result from excessive sodium intake over time?",
    options: {
      A: "Hypertension (high blood pressure)",
      B: "Lung cancer",
      C: "Depression",
      D: "Arthritis",
    },
    correctAnswer: "A",
    mark: 1,
    feedback:
      "Correct! Excessive sodium intake raises blood pressure, increasing the risk of heart disease and stroke.",
  },
  {
    question:
      "True or False: You need to add salt to your diet to stay healthy.",
    options: {
      A: "True",
      B: "False",
    },
    correctAnswer: "B",
    mark: 1,
    feedback:
      "Correct! The body gets enough sodium from natural foods, so you don’t need to add extra salt.",
  },
  {
    question: "How does excess sodium affect your heart?",
    options: {
      A: "Increases blood pressure",
      B: "Decreases heart rate",
      C: "Reduces cholesterol levels",
      D: "Strengthens the heart",
    },
    correctAnswer: "A",
    mark: 1,
    feedback:
      "Correct! Too much sodium raises blood pressure, putting strain on your heart.",
  },
  {
    question: "Which of these is considered a low-sodium snack?",
    options: {
      A: "Plain popcorn",
      B: "Salted peanuts",
      C: "Pretzels",
      D: "Cheese sticks",
    },
    correctAnswer: "A",
    mark: 1,
    feedback:
      "Correct! Plain popcorn is a healthy, low-sodium snack when prepared without added salt or butter.",
  },
  {
    question: "What percentage of daily sodium intake comes from table salt?",
    options: {
      A: "10%",
      B: "25%",
      C: "50%",
      D: "70%",
    },
    correctAnswer: "A",
    mark: 1,
    feedback:
      "Correct! Only about 10% of sodium comes from table salt. The majority comes from processed and packaged foods.",
  },
  {
    question: "Which type of salt contains the least sodium?",
    options: {
      A: "Table salt",
      B: "Sea salt",
      C: "Himalayan pink salt",
      D: "All contain similar amounts of sodium",
    },
    correctAnswer: "D",
    mark: 1,
    feedback:
      "Correct! All types of salt, including sea salt and Himalayan salt, have similar sodium content by weight.",
  },
  {
    question: "What’s the best way to reduce sodium when cooking at home?",
    options: {
      A: "Use less table salt",
      B: "Avoid processed ingredients",
      C: "Add herbs and spices for flavour",
      D: "All of the above",
    },
    correctAnswer: "D",
    mark: 1,
    feedback:
      "Correct! Reducing table salt, avoiding processed foods, and using natural seasonings can all help reduce sodium intake.",
  },
  {
    question: "True or False: Frozen vegetables are always high in sodium.",
    options: {
      A: "True",
      B: "False",
    },
    correctAnswer: "B",
    mark: 1,
    feedback:
      "Correct! Most plain frozen vegetables are low in sodium, but avoid those with added sauces or seasonings.",
  },
  {
    question: "Which of these breakfast options is lowest in sodium?",
    options: {
      A: "Oatmeal with fresh fruit",
      B: "Sausage and eggs",
      C: "Bagel with cream cheese",
      D: "Cereal with milk",
    },
    correctAnswer: "A",
    mark: 1,
    feedback:
      "Correct! Oatmeal with fresh fruit is naturally low in sodium and makes for a heart-healthy breakfast.",
  },
  {
    question: "What happens when the kidneys cannot process excess sodium?",
    options: {
      A: "Sodium is stored in the bones",
      B: "Blood pressure increases",
      C: "The body produces more insulin",
      D: "Sodium is converted to fat",
    },
    correctAnswer: "B",
    mark: 1,
    feedback:
      "Correct! Excess sodium leads to fluid retention, increasing blood pressure and straining the kidneys.",
  },
  {
    question: "What does “sodium content per serving” on a food label mean?",
    options: {
      A: "The amount of sodium in the entire package",
      B: "The amount of sodium in one serving size",
      C: "The amount of sodium added during cooking",
      D: "None of the above",
    },
    correctAnswer: "B",
    mark: 1,
    feedback:
      "Correct! Sodium content per serving reflects the amount of sodium in a single serving, as defined on the label.",
  },
  {
    question: "True or False: Bread can be a major source of sodium.",
    options: {
      A: "True",
      B: "False",
    },
    correctAnswer: "A",
    mark: 1,
    feedback:
      "Correct! Bread and other baked goods can contain significant amounts of sodium, especially if they are processed or pre-packaged.",
  },
  {
    question: "Which of these condiments typically has the least sodium?",
    options: {
      A: "Mustard",
      B: "Soy sauce",
      C: "Vinegar",
      D: "Ketchup",
    },
    correctAnswer: "C",
    mark: 1,
    feedback:
      "Correct! Vinegar is a low-sodium option for adding flavour, unlike soy sauce or ketchup.",
  },
  {
    question:
      "What percentage of your daily sodium intake should ideally come from natural foods?",
    options: {
      A: "10%",
      B: "25%",
      C: "50%",
      D: "100%",
    },
    correctAnswer: "D",
    mark: 1,
    feedback:
      "Correct! Ideally, all of your sodium intake should come from natural, unprocessed foods, which provide enough sodium for your body’s needs.",
  },
  {
    question: "Which is a good alternative to salt in recipes?",
    options: {
      A: "Sugar",
      B: "Lemon zest",
      C: "Butter",
      D: "MSG",
    },
    correctAnswer: "B",
    mark: 1,
    feedback:
      "Correct! Lemon zest, garlic, and other natural seasonings can enhance flavour without adding sodium.",
  },

  {
    question: "Which type of cheese is generally lower in sodium?",
    options: {
      A: "Feta",
      B: "Parmesan",
      C: "Swiss",
      D: "Blue cheese",
    },
    correctAnswer: "C",
    feedback:
      "Correct! Swiss cheese tends to have less sodium compared to processed or aged cheeses like feta or parmesan.",
  },
  {
    question: "What does 'no added salt' mean on a food label?",
    options: {
      A: "The product contains no sodium at all",
      B: "The product has no salt added during processing",
      C: "The product is sodium-free",
      D: "The product is safe for everyone",
    },
    correctAnswer: "B",
    feedback:
      "'No added salt' means that no salt was added during processing, but the product may still contain natural sodium.",
  },
  {
    question:
      "True or False: Cooking at home can help you reduce sodium intake.",
    correctAnswer: "True",
    options: {
      A: "True",
      B: "False",
    },
    feedback:
      "Correct! Cooking at home gives you control over the ingredients and allows you to use less salt.",
  },
  {
    question: "Which of these is NOT a low-sodium snack?",
    options: {
      A: "Unsalted nuts",
      B: "Carrot sticks",
      C: "Salted crackers",
      D: "Fresh fruit",
    },
    correctAnswer: "C",
    feedback:
      "Correct! Salted crackers can be high in sodium, unlike fresh fruits or unsalted nuts.",
  },
  {
    question: "How does sodium affect blood pressure?",
    options: {
      A: "It lowers blood pressure",
      B: "It increases blood pressure",
      C: "It stabilises blood pressure",
      D: "It has no effect on blood pressure",
    },
    correctAnswer: "B",
    feedback:
      "Correct! High sodium intake causes the body to retain water, increasing blood pressure.",
  },
  {
    question:
      "Which of these foods is likely to have the highest sodium content?",
    options: {
      A: "Fresh cucumber",
      B: "Canned soup",
      C: "Boiled potatoes",
      D: "Steamed broccoli",
    },
    correctAnswer: "B",
    feedback:
      "Correct! Canned soups are often loaded with sodium to enhance flavour and preserve freshness.",
  },
  {
    question: "True or False: All frozen meals are high in sodium.",
    options: {
      A: "Fresh cucumber",
      B: "Canned soup",
      C: "Boiled potatoes",
      D: "Steamed broccoli",
    },
    correctAnswer: "False",
    feedback:
      "Correct! While many frozen meals are high in sodium, there are low-sodium options available. Always check the label.",
  },
  {
    question: "What is a safe way to flavour food without adding sodium?",
    options: {
      A: "Use garlic powder",
      B: "Add bouillon cubes",
      C: "Use salted butter",
      D: "Add MSG",
    },
    correctAnswer: "A",
    feedback:
      "Correct! Garlic powder, onion powder, and herbs are great for adding flavour without increasing sodium.",
  },
  {
    question: "Which of these meats is typically highest in sodium?",
    options: {
      A: "Grilled chicken breast",
      B: "Roasted turkey",
      C: "Cured ham",
      D: "Fresh fish",
    },
    correctAnswer: "C",
    feedback:
      "Correct! Processed and cured meats like ham are high in sodium due to added salts and preservatives.",
  },
  {
    question: "Which drink is sodium-free?",
    options: {
      A: "Bottled water",
      B: "Diet soda",
      C: "Sports drinks",
      D: "Canned vegetable juice",
    },
    correctAnswer: "A",
    feedback:
      "Correct! Plain bottled water is sodium-free, while sodas and sports drinks often contain added sodium.",
  },
  {
    question: "How does sodium affect water retention?",
    options: {
      A: "It decreases water retention",
      B: "It has no effect",
      C: "It increases water retention",
      D: "It stabilises water retention",
    },
    correctAnswer: "C",
    feedback:
      "Correct! Sodium causes the body to retain water, which can lead to swelling and increased blood pressure.",
  },
  {
    question:
      "What is the sodium limit for a food to be considered low-sodium?",
    options: {
      A: "100 mg per serving",
      B: "140 mg per serving",
      C: "200 mg per serving",
      D: "300 mg per serving",
    },
    correctAnswer: "B",
    feedback:
      "Correct! Low-sodium foods contain 140 mg of sodium or less per serving.",
  },
  {
    question: "True or False: Sodium is necessary for muscle function.",
    options: {
      A: "False",
      B: "True",
    },
    correctAnswer: "True",
    feedback:
      "Correct! Sodium helps muscles contract and nerves function, but too much can be harmful.",
  },
  {
    question: "Which food is the best option for a low-sodium lunch?",
    options: {
      A: "Grilled chicken salad with lemon juice",
      B: "Pepperoni pizza",
      C: "Tuna sandwich with mayonnaise",
      D: "Cheese quesadilla",
    },
    correctAnswer: "A",
    feedback:
      "Correct! A salad with grilled chicken and lemon juice is naturally low in sodium.",
  },
  {
    question: "Which of these is a hidden source of sodium?",
    options: {
      A: "Cereal",
      B: "Fresh apples",
      C: "Raw eggs",
      D: "Honey",
    },
    correctAnswer: "A",
    feedback:
      "Correct! Many cereals contain added sodium, even though they don’t taste salty.",
  },
  {
    question: "How does reducing sodium improve health?",
    options: {
      A: "It lowers blood pressure",
      B: "It reduces water retention",
      C: "It lowers the risk of heart disease",
      D: "All of the above",
    },
    correctAnswer: "D",
    feedback:
      "Correct! Reducing sodium has multiple health benefits, including lowering blood pressure and reducing heart disease risk.",
  },
    {
      question: "True or False: Fresh fruit contains very little sodium.",
      options: {
        A: "True",
        B: "False"
      },
      correctAnswer: "A",
      feedback:
        "Correct! Fresh fruits are naturally low in sodium and make great snack options."
    },
    {
      question: "What’s the best way to reduce sodium in canned beans?",
      options: {
        A: "Add vinegar",
        B: "Rinse them under water",
        C: "Boil them again",
        D: "Add more salt during cooking"
      },
      correctAnswer: "B",
      feedback:
        "Correct! Rinsing canned beans under water can remove up to 40% of the sodium."
    },
    {
      question: "Which soup is likely to have the least sodium?",
      options: {
        A: "Cream of mushroom",
        B: "Chicken noodle soup",
        C: "Low-sodium vegetable soup",
        D: "Clam chowder"
      },
      correctAnswer: "C",
      feedback:
        "Correct! Look for soups labeled 'low sodium' to cut back on added salt."
    },
    {
      question: "Which food group naturally contains the least sodium?",
      options: {
        A: "Dairy products",
        B: "Fruits and vegetables",
        C: "Grains",
        D: "Meats"
      },
      correctAnswer: "B",
      feedback:
        "Correct! Fresh fruits and vegetables are naturally low in sodium."
    },
    {
      question: "Which cooking method adds the least sodium to food?",
      options: {
        A: "Deep-frying",
        B: "Steaming",
        C: "Baking with salt",
        D: "Grilling with marinades"
      },
      correctAnswer: "B",
      feedback:
        "Correct! Steaming adds no sodium and preserves the natural flavours of the food."
    },
    {
      question: "True or False: Sea salt is healthier than table salt.",
      options: {
        A: "True",
        B: "False"
      },
      correctAnswer: "B",
      feedback:
        "Correct! Sea salt and table salt contain similar sodium levels by weight. The difference is only in texture and flavour."
    },
    {
      question: "Which is a good strategy to reduce sodium intake?",
      options: {
        A: "Eat smaller portions of high-sodium foods",
        B: "Avoid processed snacks",
        C: "Cook at home with fresh ingredients",
        D: "All of the above"
      },
      correctAnswer: "D",
      feedback:
        "Correct! Combining these strategies can significantly reduce your daily sodium intake."
    },
    {
      question: "What is the maximum daily sodium intake recommended for children aged 4–8?",
      options: {
        A: "1,200 mg",
        B: "1,500 mg",
        C: "2,000 mg",
        D: "2,300 mg"
      },
      correctAnswer: "A",
      feedback:
        "Correct! For children aged 4–8, the recommended sodium limit is 1,200 mg per day."
    },
    {
      question: "Which of these foods is naturally high in sodium?",
      options: {
        A: "Cucumber",
        B: "Celery",
        C: "Banana",
        D: "Apple"
      },
      correctAnswer: "B",
      feedback:
        "Correct! Celery is naturally higher in sodium compared to most fruits and vegetables."
    },
    {
      question: "What does 'sodium reduction' mean?",
      options: {
        A: "Reducing sodium intake from all sources",
        B: "Eliminating table salt from the diet",
        C: "Avoiding salty-tasting foods",
        D: "Cooking food without salt"
      },
      correctAnswer: "A",
      feedback:
        "Correct! Sodium reduction means lowering your overall sodium intake, including from hidden sources like processed foods."
    },
    {
      question: "Which type of milk is naturally low in sodium?",
      options: {
        A: "Skim milk",
        B: "Whole milk",
        C: "Almond milk",
        D: "All of the above"
      },
      correctAnswer: "D",
      feedback:
        "Correct! Both dairy and plant-based milks like almond milk are naturally low in sodium."
    },
    {
      question: "What’s the purpose of sodium in processed foods?",
      options: {
        A: "To enhance flavour",
        B: "To preserve freshness",
        C: "To improve texture",
        D: "All of the above"
      },
      correctAnswer: "D",
      feedback:
        "Correct! Sodium is used in processed foods for flavour, preservation, and texture."
    },
    {
      question: "How does sodium affect bone health?",
      options: {
        A: "Increases calcium loss in urine",
        B: "Strengthens bones",
        C: "Prevents bone loss",
        D: "Has no effect"
      },
      correctAnswer: "A",
      feedback:
        "Correct! High sodium intake can lead to calcium loss in urine, which may weaken bones over time."
    },
    {
      question: "Which soup ingredient is typically high in sodium?",
      options: {
        A: "Broth cubes",
        B: "Fresh carrots",
        C: "Cooked rice",
        D: "Garlic cloves"
      },
      correctAnswer: "A",
      feedback:
        "Correct! Broth cubes and bouillon are very high in sodium and should be used sparingly."
    },
    {
      question: "True or False: Sodium is naturally present in almost all foods.",
      options: {
        A: "True",
        B: "False"
      },
      correctAnswer: "A",
      feedback:
        "Correct! Sodium is naturally present in small amounts in most foods, but excessive amounts come from added salt and processed foods."
    },
    {
      question: "Which of these canned foods is likely the lowest in sodium?",
      options: {
        A: "Canned beans",
        B: "Low-sodium canned beans",
        C: "Regular canned soup",
        D: "Canned pasta sauce"
      },
      correctAnswer: "B",
      feedback:
        "Correct! Low-sodium versions of canned beans or vegetables are a better choice."
    },
  

  {
    question: "What’s the easiest way to identify high-sodium foods?",
    options: {
      A: "Taste them",
      B: "Read the food label",
      C: "Check for preservatives",
      D: "Look at the colour of the food",
    },
    correctAnswer: "B",
    feedback:
      "Correct! The Nutrition Facts label provides the sodium content per serving.",
  },
  {
    question: "How much sodium is in 2 teaspoons of table salt?",
    options: {
      A: "2,300 mg",
      B: "4,600 mg",
      C: "5,000 mg",
      D: "1,000 mg",
    },
    correctAnswer: "B",
    feedback:
      "Correct! Each teaspoon contains about 2,300 mg, so 2 teaspoons equal 4,600 mg of sodium.",
  },
  {
    question: "Which of these helps lower blood pressure?",
    options: {
      A: "Eating more potassium-rich foods",
      B: "Drinking more caffeine",
      C: "Increasing sodium intake",
      D: "Avoiding all water",
    },
    correctAnswer: "A",
    feedback:
      "Correct! Potassium counteracts sodium’s effects and helps lower blood pressure.",
  },
  {
    question: "What’s the sodium content in a 'low-sodium' product?",
    options: {
      A: "Less than 140 mg per serving",
      B: "Less than 200 mg per serving",
      C: "Less than 500 mg per serving",
      D: "Less than 1,000 mg per serving",
    },
    correctAnswer: "A",
    feedback:
      "'Low sodium' means the food contains less than 140 mg of sodium per serving.",
  },
  {
    question: "What’s the best way to reduce sodium in homemade soup?",
    options: {
      A: "Add more salt later",
      B: "Use herbs and spices instead of salt",
      C: "Add bouillon cubes for flavour",
      D: "Use salted broth",
    },
    correctAnswer: "B",
    feedback:
      "Correct! Herbs and spices add flavour without sodium, making your soup healthier.",
  },
  {
    question: "Which of these foods is naturally low in sodium?",
    options: {
      A: "Bananas",
      B: "Cheese",
      C: "Pickles",
      D: "Bread",
    },
    correctAnswer: "A",
    feedback:
      "Correct! Bananas and other fresh fruits are naturally low in sodium.",
  },
  {
    question:
      "True or False: Processed snacks are the leading source of sodium in children’s diets.",
    correctAnswer: "True",
    options:{
        A:"True",
        B:'False'
    },
    feedback:
      "Correct! Processed snacks like chips and crackers are a major source of sodium in children’s diets.",
  },
  {
    question: "How much sodium is in 'sodium-free' foods?",
    options: {
      A: "Less than 5 mg per serving",
      B: "Less than 50 mg per serving",
      C: "Less than 100 mg per serving",
      D: "Zero sodium",
    },
    correctAnswer: "A",
    feedback: "'Sodium-free' means less than 5 mg per serving.",
  },
  {
    question: "Which grain is naturally sodium-free?",
    options: {
      A: "White rice",
      B: "Quinoa",
      C: "Oats",
      D: "All of the above",
    },
    correctAnswer: "D",
    feedback:
      "Correct! Grains like rice, quinoa, and oats are naturally sodium-free before processing.",
  },
  {
    question: "True or False: Pickles are low in sodium.",
    correctAnswer: "False",
    feedback: "Correct! Pickles are high in sodium due to the brining process.",
    options:{
        A:"True",
        B:'False'
    },
  },
  {
    question: "Which food has the least hidden sodium?",
    options: {
      A: "Fresh chicken",
      B: "Marinated chicken",
      C: "Deli meat",
      D: "Sausages",
    },
    correctAnswer: "A",
    feedback:
      "Correct! Fresh chicken has no added sodium, unlike processed or marinated versions.",
  },
  {
    question: "Which is a low-sodium alternative to salty snacks?",
    options: {
      A: "Fresh fruit slices",
      B: "Potato chips",
      C: "Pretzels",
      D: "Salted nuts",
    },
    correctAnswer: "A",
    feedback:
      "Correct! Fresh fruits like apple slices are naturally low in sodium and make a healthy snack.",
  },
  {
    question: "What effect does high sodium have on your kidneys?",
    options: {
      A: "Increases risk of kidney disease",
      B: "Improves kidney function",
      C: "Has no effect",
      D: "Strengthens kidney tissues",
    },
    correctAnswer: "A",
    feedback:
      "Correct! High sodium intake can strain the kidneys, increasing the risk of kidney disease over time.",
  },
  {
    question: "Which fast-food item is likely to have the most sodium?",
    options: {
      A: "Grilled chicken sandwich",
      B: "French fries",
      C: "Caesar salad with dressing",
      D: "Double cheeseburger",
    },
    correctAnswer: "D",
    feedback:
      "Correct! Double cheeseburgers often contain high levels of sodium due to the processed cheese, sauces, and patties.",
  },
  {
    question: "What does the term 'unsalted' mean on a food label?",
    options: {
      A: "The product is sodium-free",
      B: "No salt was added during processing",
      C: "The product contains no preservatives",
      D: "The product is low-sodium",
    },
    correctAnswer: "B",
    feedback:
      "'Unsalted' means that no additional salt was added during processing, but the product may still contain natural sodium.",
  },
  {
    question: "How much sodium is in 100 grams of fresh spinach?",
    options: {
      A: "20 mg",
      B: "50 mg",
      C: "80 mg",
      D: "100 mg",
    },
    correctAnswer: "B",
    feedback:
      "Correct! Fresh spinach contains about 50 mg of sodium per 100 grams, making it a naturally low-sodium food.",
  },

  {
    question: "True or False: All processed foods are high in sodium.",
    options: {
      A: "True",
      B: "False",
    },
    correctAnswer: "B",
    feedback:
      "Correct! While many processed foods are high in sodium, some options like unsalted nuts or low-sodium canned goods are not.",
  },
  {
    question: "Which type of bread is likely to have the lowest sodium?",
    options: {
      A: "Sourdough bread",
      B: "Whole wheat bread",
      C: "Low-sodium bread",
      D: "White bread",
    },
    correctAnswer: "C",
    feedback:
      "Correct! Low-sodium bread is specifically formulated to reduce sodium content compared to other types.",
  },
  {
    question: "Which mineral helps counteract the effects of sodium?",
    options: {
      A: "Magnesium",
      B: "Potassium",
      C: "Calcium",
      D: "Iron",
    },
    correctAnswer: "B",
    feedback:
      "Correct! Potassium helps counteract the effects of sodium by balancing fluid levels in the body.",
  },
  {
    question: "True or False: Cheese is always a high-sodium food.",
    options: {
      A: "True",
      B: "False",
    },
    correctAnswer: "B",
    feedback:
      "Correct! While many cheeses are high in sodium, some options like Swiss cheese and fresh mozzarella are lower in sodium.",
  },
  {
    question: "How does sodium affect the body’s water balance?",
    options: {
      A: "It decreases water retention",
      B: "It increases water retention",
      C: "It has no effect on water balance",
      D: "It promotes dehydration",
    },
    correctAnswer: "B",
    feedback:
      "Correct! Sodium causes the body to retain water, which can increase blood pressure and swelling.",
  },
  {
    question: "Which sauce is typically highest in sodium?",
    options: {
      A: "Soy sauce",
      B: "Tomato sauce",
      C: "Pesto",
      D: "Vinegar",
    },
    correctAnswer: "A",
    feedback:
      "Correct! Soy sauce is one of the saltiest condiments, often containing over 900 mg of sodium per tablespoon.",
  },
  {
    question: "What’s the best way to lower sodium in canned soup?",
    options: {
      A: "Add water to dilute it",
      B: "Add fresh vegetables",
      C: "Use low-sodium versions",
      D: "Avoid heating it",
    },
    correctAnswer: "C",
    feedback:
      "Correct! Choosing low-sodium versions of canned soup is the easiest way to reduce sodium intake.",
  },
  {
    question: "Which snack is naturally sodium-free?",
    options: {
      A: "Unsalted popcorn",
      B: "Apples",
      C: "Grapes",
      D: "All of the above",
    },
    correctAnswer: "D",
    feedback:
      "Correct! Fresh fruits like apples and grapes, as well as unsalted popcorn, are sodium-free snacks.",
  },
  {
    question: "True or False: Most sodium in our diets comes from table salt.",
    options: {
      A: "True",
      B: "False",
    },
    correctAnswer: "B",
    feedback:
      "Correct! Over 70% of sodium in our diets comes from processed and packaged foods, not table salt.",
  },
  {
    question: "How much sodium is in a teaspoon of soy sauce?",
    options: {
      A: "500 mg",
      B: "700 mg",
      C: "1,000 mg",
      D: "1,200 mg",
    },
    correctAnswer: "B",
    feedback:
      "Correct! One teaspoon of soy sauce typically contains around 700 mg of sodium.",
  },
  {
    question: "Which of these is NOT a high-sodium food?",
    options: {
      A: "Deli meat",
      B: "Pretzels",
      C: "Fresh broccoli",
      D: "Canned soup",
    },
    correctAnswer: "C",
    feedback:
      "Correct! Fresh broccoli is naturally low in sodium, unlike deli meats, pretzels, and canned soup.",
  },
  {
    question:
      "What’s the recommended sodium intake for individuals with high blood pressure?",
    options: {
      A: "2,300 mg",
      B: "1,500 mg",
      C: "1,800 mg",
      D: "2,000 mg",
    },
    correctAnswer: "B",
    feedback:
      "Correct! The recommended sodium intake for individuals with high blood pressure is 1,500 mg per day.",
  },
  {
    question: "Which of these is a low-sodium breakfast option?",
    options: {
      A: "Oatmeal with fresh berries",
      B: "Sausage and eggs",
      C: "Bagel with cream cheese",
      D: "Pancakes with syrup",
    },
    correctAnswer: "A",
    feedback:
      "Correct! Oatmeal with fresh berries is naturally low in sodium and packed with nutrients.",
  },
  {
    question:
      "True or False: Eating out regularly makes it harder to control sodium intake.",
    options: {
      A: "True",
      B: "False",
    },
    correctAnswer: "A",
    feedback:
      "Correct! Restaurant meals often contain high levels of sodium, making it difficult to manage your intake.",
  },
  {
    question: "Which seafood option is likely the lowest in sodium?",
    options: {
      A: "Smoked salmon",
      B: "Fresh shrimp",
      C: "Grilled tilapia",
      D: "Canned tuna",
    },
    correctAnswer: "C",
    feedback:
      "Correct! Grilled tilapia is naturally low in sodium, while smoked and canned seafood can be high in added salt.",
  },
  {
    question: "Which flavouring is a good low-sodium substitute for soy sauce?",
    options: {
      A: "Tamari",
      B: "Lemon juice",
      C: "Worcestershire sauce",
      D: "Vinegar",
    },
    correctAnswer: "B",
    feedback:
      "Correct! Lemon juice adds a tangy flavour without adding sodium, unlike soy or Worcestershire sauces.",
  },
  {
    question: "What’s the sodium content of 1 slice of processed bread?",
    options: {
      A: "Low",
      B: "Medium",
      C: "High",
      D: "None",
    },
    correctAnswer: "C",
    feedback:
      "Correct! Processed bread typically contains a high amount of sodium, contributing to your overall intake.",
  },
    {
      "question": "How does reducing sodium improve health?",
      "options": {
        "A": "It lowers blood pressure",
        "B": "It reduces water retention",
        "C": "It lowers the risk of heart disease",
        "D": "All of the above"
      },
      "correctAnswer": "D",
      "feedback": "Correct! Reducing sodium has multiple health benefits, including lowering blood pressure and reducing heart disease risk."
    },
    {
      "question": "How many teaspoons of salt should an adult consume daily, according to the WHO?",
      "options": {
        "A": "1 teaspoon",
        "B": "2 teaspoons",
        "C": "3 teaspoons",
        "D": "4 teaspoons"
      },
      "correctAnswer": "A",
      "feedback": "Correct! The WHO recommends no more than 1 teaspoon of salt (5 grams) daily."
    },
    {
      "question": "Which African staple food is naturally low in salt unless salt is added during preparation?",
      "options": {
        "A": "Boiled yam",
        "B": "Fried plantains",
        "C": "Egusi soup",
        "D": "Jollof rice"
      },
      "correctAnswer": "A",
      "feedback": "Correct! Boiled yam is naturally low in salt, but frying or adding salt can increase its sodium content."
    },
    {
      "question": "Which of these ingredients commonly used in African cooking contributes the most salt?",
      "options": {
        "A": "Fresh ginger",
        "B": "Bouillon cubes",
        "C": "Palm oil",
        "D": "Fresh tomatoes"
      },
      "correctAnswer": "B",
      "feedback": "Correct! Bouillon cubes are a significant source of sodium in many African dishes."
    },
    {
      "question": "What happens to your blood pressure when you consume too much salt?",
      "options": {
        "A": "It decreases",
        "B": "It stays the same",
        "C": "It increases",
        "D": "It improves blood flow"
      },
      "correctAnswer": "C",
      "feedback": "Correct! High salt intake can lead to increased blood pressure, which is a risk factor for hypertension."
    },
    {
      "question": "Which African dish is typically high in salt due to its preparation with salted fish or stockfish?",
      "options": {
        "A": "Vegetable soup",
        "B": "Egusi soup",
        "C": "Pounded yam",
        "D": "Kenkey"
      },
      "correctAnswer": "B",
      "feedback": "Correct! Egusi soup made with salted fish or stockfish contains high amounts of salt."
    },
    {
      "question": "True or False: Adding salt while cooking rice significantly increases its sodium content.",
      "options": {
        "A": "True",
        "B": "False"
      },
      "correctAnswer": "A",
      "feedback": "Correct! Even a small amount of added salt can raise the sodium content in otherwise low-sodium foods like rice."
    },
    {
      "question": "Which snack is a low-sodium choice for a traditional African meal?",
      "options": {
        "A": "Fresh fruit salad",
        "B": "Salted peanuts",
        "C": "Plantain chips",
        "D": "Fried yam with salt"
      },
      "correctAnswer": "A",
      "feedback": "Correct! Fresh fruit salad is naturally sodium-free and a healthier snack choice."
    },
    {
      "question": "How can you reduce sodium in traditional African soups like ogbono or egusi?",
      "options": {
        "A": "Add fresh herbs and spices instead of bouillon cubes",
        "B": "Use salted crayfish for seasoning",
        "C": "Sprinkle extra salt after cooking",
        "D": "Avoid using fresh vegetables"
      },
      "correctAnswer": "A",
      "feedback": "Correct! Using fresh herbs and spices enhances flavour without adding sodium."
    },
    {
      "question": "What is the effect of rinsing canned beans before cooking?",
      "options": {
        "A": "It removes excess fat",
        "B": "It reduces sodium content",
        "C": "It increases fibre",
        "D": "It improves flavour"
      },
      "correctAnswer": "B",
      "feedback": "Correct! Rinsing canned beans can reduce sodium by up to 40%."
    },
    {
      "question": "Which traditional African ingredient is naturally sodium-free?",
      "options": {
        "A": "Fresh cassava",
        "B": "Stockfish",
        "C": "Bouillon cubes",
        "D": "Dried crayfish"
      },
      "correctAnswer": "A",
      "feedback": "Correct! Fresh cassava contains no sodium until salt is added during preparation."
    },
    {
      "question": "How does salt help preserve foods like fish and meat in traditional African cooking?",
      "options": {
        "A": "It adds flavour",
        "B": "It draws out moisture to prevent spoilage",
        "C": "It makes food softer",
        "D": "It reduces cooking time"
      },
      "correctAnswer": "B",
      "feedback": "Correct! Salt preserves food by drawing out moisture, which inhibits bacterial growth."
    },
    {
      "question": "What percentage of salt in an average African diet comes from processed foods?",
      "options": {
        "A": "20%",
        "B": "50%",
        "C": "70%",
        "D": "90%"
      },
      "correctAnswer": "C",
      "feedback": "Correct! Approximately 70% of dietary salt comes from processed foods and seasonings like bouillon cubes."
    },
    {
      "question": "Which of these cooking techniques naturally reduces sodium?",
      "options": {
        "A": "Boiling vegetables with salted water",
        "B": "Grilling fish without marinades",
        "C": "Frying yams with salted oil",
        "D": "Using processed spice mixes"
      },
      "correctAnswer": "B",
      "feedback": "Correct! Grilling fish without marinades or added salt keeps sodium levels low."
    },
      {
        "question": "How does reducing sodium improve health?",
        "options": {
          "A": "It lowers blood pressure",
          "B": "It reduces water retention",
          "C": "It lowers the risk of heart disease",
          "D": "All of the above"
        },
        "correctAnswer": "D",
        "feedback": "Correct! Reducing sodium has multiple health benefits, including lowering blood pressure and reducing heart disease risk."
      },
      {
        "question": "True or False: All salt, whether sea salt or table salt, has the same sodium content.",
        "options": {
          "A": "True",
          "B": "False"
        },
        "correctAnswer": "A",
        "feedback": "Correct! Sea salt and table salt contain similar amounts of sodium per weight, despite differences in texture and flavour."
      },
      {
        "question": "Which African snack is a healthier low-sodium option?",
        "options": {
          "A": "Salted cashews",
          "B": "Roasted corn without salt",
          "C": "Plantain chips with salt",
          "D": "Fried yam with seasoning"
        },
        "correctAnswer": "B",
        "feedback": "Correct! Roasted corn without added salt is a low-sodium snack option."
      },
      {
        "question": "How does reducing sodium benefit your heart health?",
        "options": {
          "A": "It strengthens heart muscles",
          "B": "It lowers blood pressure",
          "C": "It increases heart rate",
          "D": "It reduces oxygen needs"
        },
        "correctAnswer": "B",
        "feedback": "Correct! Lower sodium intake can lower blood pressure and reduce the risk of heart disease."
      },
      {
        "question": "Which of these breakfast choices is naturally low in sodium?",
        "options": {
          "A": "Bread with margarine",
          "B": "Porridge made with fresh milk",
          "C": "Canned beans",
          "D": "Sausages"
        },
        "correctAnswer": "B",
        "feedback": "Correct! Porridge made with fresh milk is low in sodium compared to processed options."
      },
      {
        "question": "Which is a high-sodium seasoning commonly used in African cooking?",
        "options": {
          "A": "Garlic",
          "B": "Fresh ginger",
          "C": "Bouillon cubes",
          "D": "Curry leaves"
        },
        "correctAnswer": "C",
        "feedback": "Correct! Bouillon cubes are a significant source of sodium in many recipes."
      },
      {
        "question": "How can you reduce sodium in fried rice without losing flavour?",
        "options": {
          "A": "Add extra soy sauce",
          "B": "Use fresh vegetables and herbs",
          "C": "Cook with salted butter",
          "D": "Include processed meats like sausage"
        },
        "correctAnswer": "B",
        "feedback": "Correct! Fresh vegetables and herbs enhance flavour without adding sodium."
      },
      {
        "question": "Which condition is most commonly linked to high salt intake?",
        "options": {
          "A": "Diabetes",
          "B": "Hypertension",
          "C": "Anaemia",
          "D": "Malaria"
        },
        "correctAnswer": "B",
        "feedback": "Correct! High salt intake is strongly associated with hypertension."
      },
      {
        "question": "How can you reduce sodium in your egusi soup?",
        "options": {
          "A": "Avoid using salted crayfish or stockfish",
          "B": "Add multiple bouillon cubes",
          "C": "Use canned tomato paste",
          "D": "Sprinkle salt generously"
        },
        "correctAnswer": "A",
        "feedback": "Correct! Avoiding salted ingredients helps keep egusi soup lower in sodium."
      },
      {
        "question": "What is one teaspoon of salt roughly equivalent to in grams?",
        "options": {
          "A": "2 grams",
          "B": "5 grams",
          "C": "8 grams",
          "D": "10 grams"
        },
        "correctAnswer": "B",
        "feedback": "Correct! One teaspoon of salt is approximately 5 grams."
      },
      {
        "question": "Which leafy vegetable is naturally sodium-free?",
        "options": {
          "A": "Spinach",
          "B": "Kale",
          "C": "Lettuce",
          "D": "All of the above"
        },
        "correctAnswer": "D",
        "feedback": "Correct! Most fresh leafy greens are naturally sodium-free."
      },
      {
        "question": "How does sodium contribute to the risk of stroke?",
        "options": {
          "A": "It damages brain cells",
          "B": "It increases blood pressure",
          "C": "It reduces oxygen levels in the blood",
          "D": "It causes blood clotting"
        },
        "correctAnswer": "B",
        "feedback": "Correct! High sodium raises blood pressure, which is a leading risk factor for stroke."
      },
      {
        "question": "Which condiment adds sodium to a dish?",
        "options": {
          "A": "Vinegar",
          "B": "Soy sauce",
          "C": "Fresh ginger",
          "D": "Lime juice"
        },
        "correctAnswer": "B",
        "feedback": "Correct! Soy sauce is high in sodium and should be used sparingly."
      }
    





];
