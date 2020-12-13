import React, { useState, useEffect, useCallback, useMemo } from "react";
import Child from "./child";

export default function HooksPage() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    /**
     * useEffect - tương đương lifecycle componentDidMount bên class khi tham số thứ 2 là mảng rỗng
     * Chạy 1 lần duy nhất
     */
    console.log(
      "useEffect - tương đương lifecycle componentDidMount bên class"
    );
  }, []);

  useEffect(() => {
    /**
     * useEffect - tương đương lifecycle componentDidUpdate bên class khi tham số thứ 2 là mảng khác rỗng
     */
    console.log(
      "useEffect - tương đương lifecycle componentDidUpdate bên class"
    );
  }, [number]);

  useEffect(() => {
    /**
     * useEffect - tương đương lifecycle componentWillUnMount bên class khi return 1 arrow function
     */
    const interval = setInterval(() => {
      console.log("Hello Nguyen");
    }, 1000);

    return () => {
      console.log(
        "useEffect - tương đương lifecycle componentWillUnMount bên class"
      );
      clearInterval(interval);
    };
  }, []);

  const handleTangSo = () => {
    setNumber(number + 1);
  };

  const showNumber = () => {
    console.log("showNumber");
  };

  const showNumberCallback = useCallback(showNumber, []);

  const numberUp = () => {
    let i = 0;
    while (i < 1000) i++;
    console.log(i);
    return i;
  };

  const numberUpMemo = useMemo(() => numberUp(), []);

  return (
    <div>
      <h3>HooksPage</h3>
      <h1>Number: {number}</h1>
      <h1>NumberUp: {numberUpMemo}</h1>
      <button className="btn btn-success" onClick={handleTangSo}>
        Tăng số
      </button>
      <Child showNumber={showNumberCallback} />
    </div>
  );
}
