"use client"
import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import html2canvas from "html2canvas";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tables.css';
import ar from  '../../../../public/images/avatar.png';

export default function App() {
  const [restableid, setRestableid] = useState("");
  const [selectedExt, setSelectedExt] = useState("png");
  const ref = useRef(null);
  const qrCode = useRef(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const resid = localStorage.getItem("restaurantId");
      const newUrl = `http://192.168.1.104:3000/resturant?resid=${resid}&restableid=${restableid}`;
      setUrl(newUrl);
      qrCode.current.update({
        data: newUrl,
      });
    }
  }, [restableid]);

  const onExtensionChange = (selectedExt) => {
    setSelectedExt(selectedExt);
  };

  const onDownloadClick = () => {
    if (typeof window !== 'undefined') {
      html2canvas(ref.current, { useCORS: true }).then((canvas) => {
        const image = canvas.toDataURL(`image/${selectedExt}`);
        const a = document.createElement("a");
        const filename = `table-${restableid}.${selectedExt}`;
        a.href = image;
        a.download = filename;
        a.click();
      });
    }
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
              const sanitizedValue = event.target.value.replace(/[^0-9]/g, "");
              const finalValue = sanitizedValue === "0" ? "" : sanitizedValue;
              setRestableid(finalValue);
            }}
          />
        </div>
        <br />
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
        {(restableid === "0" || restableid === '') ? (
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
