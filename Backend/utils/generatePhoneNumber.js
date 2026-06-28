const generatePhoneNumber = () => {
    let number = "03";

    for (let i = 0; i < 9; i++) {
        number += Math.floor(Math.random() * 10);
    }

    return number;
};

export default generatePhoneNumber;