'use client'
import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import html2canvas from "html2canvas";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tables.css';
import ar from  '../../../../public/images/avatar.png';

export default function App() {
  const resid = localStorage.getItem("restaurantId") || "";
  const [restableid, setRestableid] = useState("");
  
  const [url, setUrl] = useState(
    `http://192.168.1.104:3000/resturant?resid=${resid}&restableid=${restableid}`
  );
  const [selectedExt, setSelectedExt] = useState("png");
  const ref = useRef(null);
  const qrCode = useRef(null);

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 500,
      height: 500,
      image: "https://i.ibb.co/0jvXfdK/pattern-M.png",
      dotsOptions: {
        color: "#000000",
        type: "rounded",
      },
      imageOptions: {
        crossOrigin: "anonymous",
      },
    });
    qrCode.current.append(ref.current);
  }, []);

  useEffect(() => {
    setUrl(`http://192.168.1.104:3000/resturant?resid=${resid}&restableid=${restableid}`);
    qrCode.current.update({
      data: url,
    });
  }, [restableid, resid, url]);

  const onExtensionChange = (selectedExt) => {
    setSelectedExt(selectedExt);
  };

  const onDownloadClick = () => {
    html2canvas(ref.current, { useCORS: true }).then((canvas) => {
      const image = canvas.toDataURL(`image/${selectedExt}`);
      const a = document.createElement("a");
      // Dynamically generate the filename based on table number
      const filename = `table-${restableid}.${selectedExt}`;
      a.href = image;
      a.download = filename;
      a.click();
    });
  };

  const handleTableIdChange = (event) => {
    setRestableid(event.target.value);
  };

  return (
    <div className="App" style={styles.container}>
      <div>
        <div className="form-group">
        <input
        type="text"
        pattern="[1-9][0-9]*"
        inputMode="numeric"
        className="form-control custom-input"
        placeholder="Enter Table ID"
        value={restableid}
        onChange={(event) => {
          // Remove non-numeric characters
          const sanitizedValue = event.target.value.replace(/[^0-9]/g, "");
          // Ensure the value is not '0' as the first digit
          const finalValue = sanitizedValue === "0" ? "" : sanitizedValue;
          // Update the state with the sanitized value
          setRestableid(finalValue);
        }}
      />
        </div>
        <br></br>
      </div>
      <div ref={ref} />
      <div style={styles.buttonsContainer}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedExt.toUpperCase()}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onExtensionChange("png")}>PNG</Dropdown.Item>
            <Dropdown.Item onClick={() => onExtensionChange("jpeg")}>JPEG</Dropdown.Item>
            <Dropdown.Item onClick={() => onExtensionChange("webp")}>WEBP</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {restableid === "0" || restableid === ''  ?  (
          <Button onClick={onDownloadClick} disabled>
            Download
          </Button>
        ) : (
          <Button onClick={onDownloadClick}>Download</Button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonsContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
};
