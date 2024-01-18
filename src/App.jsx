import { useState, useCallback, useEffect, useRef } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  // useref hook
  const passwordRef = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-={}[]|;:',.<>/?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
    setShow(true);

    setTimeout( () => {
      setShow(false)
    },1000);
  });

  useEffect(() => {
    passGenerator();
  }, [length, numAllowed, charAllowed, passGenerator]);

  return (
    <>
      
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange bg-gray-500">
        <Alert show={show} variant="success">
        <p>Text copied successfully..</p>
        <div className="d-flex justify-content-end">
        </div>
      </Alert>
        <h1 className="text-3xl text-center text-white mb-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          {!show && (
            <button
              onClick={() => {
                setShow(true);
                copyPasswordToClipboard();
              }}
              className="outline-none bg-blue-700 px-3 py-0.5 shrink-0 text-white"
            >
              Copy
            </button>
          )}
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center mr-3 gap-x-1">
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-orange-400">Length:{length}</label>
          </div>
          <div className="flex items-center mr-3 gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={(e) => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label className="text-orange-400" htmlFor="numberInput">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={(e) => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="text-orange-400" htmlFor="charInput">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
