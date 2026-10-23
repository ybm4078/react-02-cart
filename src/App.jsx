import {useState} from "react";

function App() {
    const [name, setName] = useState("");
    const [cart, setCart] = useState([]);
    return (
        <>
            <h2>Simple Shop</h2>
            <fieldest>
                <legend>상품추가</legend>
                <form>
                    <input placeholder={"상품명을 입력하세요"} value={name} />
                    <button type={"submit"}>카트에 담기</button>
                </form>
            </fieldest>
        </>
    );
}

export default App;