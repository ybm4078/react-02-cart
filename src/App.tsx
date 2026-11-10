import { type SubmitEvent, type ChangeEvent, useState } from "react";
import styles from "./App.module.css";

type Product = {
    name: string;
    quantity: number;
}

function App() {
    const [name, setName] = useState<string>("");
    const [cart, setCart] = useState<Product[]>([]);

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name === "" || name === " ") {
            return;
        }
        setCart([...cart, { name: name, quantity: 1 }]);
        setName("");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => setName(e.target.value);

    const handleUpdateQuantity = (index:number, number:number) => {
        const newCart = [...cart];
        const nextQuantity = newCart[index].quantity + number;
        if (nextQuantity < 1) {
            return;
        }
        newCart[index].quantity = nextQuantity;
        setCart(newCart);
    }

    const handleDeleteButton = (index: number) => {
        const result = cart.filter((_, i) => {return i !== index});
        setCart(result);
    }

       const totalQuantity = cart.reduce((sum, item) => {return item.quantity + sum}, 0)

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Simple Shop</h2>
            <fieldset className={styles.fieldest}>
                <legend className={styles.legend}>상품추가</legend>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>{name.length}글자수 </div>
                    <input
                        className={styles.input}
                        placeholder={"상품명을 입력하세요"}
                        value={name}
                        onChange={handleChange}
                    />
                    <button className={styles.submitButton} type={"submit"}>
                        카트에 담기
                    </button>
                </form>
            </fieldset>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead style={{ backgroundColor: "#f2f2f2" }}>
                        <tr>
                            <th>상품명</th>
                            <th>수량 제어</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>
                                    <div className={styles.quantityGroup}>
                                        <button
                                            className={styles.qtyButton}
                                            onClick={() => handleUpdateQuantity(index, -10)}>
                                            -10
                                        </button>
                                        <button
                                            className={styles.qtyButton}
                                            onClick={() => handleUpdateQuantity(index, -1)}>
                                            -
                                        </button>
                                        <span className={styles.quantityText}>{item.quantity}</span>
                                        <button
                                            className={styles.qtyButton}
                                            onClick={() => handleUpdateQuantity(index, +1)}>
                                            +
                                        </button>
                                        <button
                                            className={styles.qtyButton}
                                            onClick={() => handleUpdateQuantity(index, +10)}>
                                            +10
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDeleteButton(index)}>
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h3 className={styles.summary}>
                총 품목 : {cart.length}개 / 총 수량: {totalQuantity}개
            </h3>
        </div>
    );
}

export default App;