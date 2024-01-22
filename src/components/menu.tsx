import { useNavigate } from "react-router-dom";

interface SubSection {
  title: string;
  url: string;
  icon?: React.ReactElement;
  elementEnd?: React.ReactElement;
}

export interface Section {
  title: string;
  icon?: React.ReactElement;
  subSections?: SubSection[];
}

interface MenuProps {
  sections: Section[];
}

function Menu(props: MenuProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-100 rounded">
      {props.sections.map((s, i) => (
        <div key={`menu-sub-section-item-${i}`} className="flex flex-col">
          <div className="flex flex-row items-center m-2 space-x-2">
            <div>{s.icon}</div>
            <div className="text-md">{s.title}</div>
          </div>
          {s.subSections?.map((sB, i) => (
            <div
              key={`menu-sub-section-item-${i}`}
              onClick={() => navigate(sB.url)}
              className="bg-slate-200 flex flex-row justify-between items-center rounded ml-4 mr-2 my-1 p-1 h-9 cursor-pointer"
            >
              <div className="text-sm">{sB.title}</div>
              <div>{sB.elementEnd}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Menu;
