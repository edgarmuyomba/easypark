export default function handleSlotOptionClick(slot, slots, action) {
    let result = {};
    switch (action) {
        case "park":
            result = park(slot, slots);
            break;
        case "release":
            break;
        case "delete":
            break;
        case "edit":
            break;
        default:
            break;
    }
    return result;
}

// each should return a style, an updated slots array and a message

const park = async (slot, slots) => {

    let data = null;
    let styles = null;

    const options = {
        method: "POST"
    };

    try {
        const response = await fetch(`http://localhost:8000/park_in_slot/${slot.parking_lot}/${slot.uuid}/`, options);
        data = await response.json();
    } catch (error) {
        styles = {
            backgroundColor: 'rgb(255, 130, 107)',
            color: 'rgb(116, 0, 0)',
            border: '1px solid red',
            borderTop: 'none',
            fontWeight: 'normal'
        };
        data = error;
    } finally {
        for (let _slot of slots) {
            if (slot.uuid === _slot.uuid) {
                slot.occupied = true;
            }
        }
    }

    return {
        "message": data,
        "styles": styles,
        "slots": slots
    }
}