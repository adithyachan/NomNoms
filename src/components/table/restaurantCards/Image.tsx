import { url } from "inspector";

export default function RenderImage(props : {url : string, name : string}) {
    return (
      <div>
        {/* 👇 show remote image */}
        <img
          src = {props.url}
          alt={props.name}
          width = "500"
          height = "500"
        />
  
        <br />
  
        <span
          style={{
            color: 'green',
            fontSize: '1.2em',
            fontWeight: 'bold',
          }}
        >
          {props.name}
        </span>
      </div>
    );
  }