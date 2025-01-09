import React from "react";
import { useInView } from "react-intersection-observer";
import { parrentHeading } from "./The_Basics_of_Sodium_and_Health";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface HeadingListComponentProps {
  click: () => void;
  text: string;
  item:parrentHeading,
  open:(e:HTMLElement,index:number)=>void,
  setSection_HeadingList:(e:parrentHeading[])=>void
}

const HeadingListComponent: React.FC<HeadingListComponentProps> = ({ click, text,item,open}) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.1, // Trigger when 10% of the element is in view
  });

  return (
    <><div
      ref={ref}
      className={`list d-flex justify-content-between align-items-center ${inView ? "fade-in" : ""}`}
      onClick={click}

    >
      <a dangerouslySetInnerHTML={{ __html: text }} /> {item.children ? <FaAngleUp size={17}/>: <FaAngleDown size={17}/>}
    </div>

    {item?.children && <div className="coverContainer d-flex justify-content-end" >
        
        <div >
        
        {item.children.map((e,i:number)=>{
        const text_=e.innerHTML
        if(text===text_)return <></>
        return <div
      ref={ref}
      className={`list ${inView ? "fade-in" : ""}`}
      onClick={()=>open(e,i)}
    >
      <a dangerouslySetInnerHTML={{ __html: text_ }} />
    </div>
})}
</div>

</div>}
    

    </>
  );
};

export default HeadingListComponent;
