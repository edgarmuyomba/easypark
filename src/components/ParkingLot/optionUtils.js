export default async function handleSlotOptionClick(slot, slots, action) {
    let result = {};
    switch (action) {
        case "park":
            result = await park(slot, slots);
            break;
        case "release":
            result = await release(slot, slots);
            break;
        case "destroy":
            result = await destroy(slot, slots);
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

    const response = await fetch(`http://localhost:8000/park_in_slot/${slot.parking_lot}/${slot.uuid}/`, options);
    data = await response.json();
    if (response.status === 400) {
        styles = {
            backgroundColor: 'rgb(253, 159, 142)',
            color: 'rgb(116, 0, 0)',
            border: '1px solid red',
            borderTop: 'none',
            fontWeight: 'normal'
        };
    } else {
        for (let _slot of slots) {
            if (slot.uuid === _slot.uuid) {
                _slot.occupied = true;
            }
        }
    }

    return {
        "message": data.detail,
        "styles": styles,
        "slots": slots
    }
}

const release = async (slot, slots) => {
    let data = null;
    let styles = null;

    const options = {
        method: "POST"
    };

    const response = await fetch(`http://localhost:8000/release_slot/${slot.parking_lot}/${slot.uuid}/`, options);
    data = await response.json();
    if (response.status === 404) {
        styles = {
            backgroundColor: 'rgb(253, 159, 142)',
            color: 'rgb(116, 0, 0)',
            border: '1px solid red',
            borderTop: 'none',
            fontWeight: 'normal'
        };
    } else {
        for (let _slot of slots) {
            if (slot.uuid === _slot.uuid) {
                _slot.occupied = false;
            }
        }
    }

    return {
        "message": data.detail,
        "styles": styles,
        "slots": slots
    }
}

const destroy = async (slot, slots) => {
    let data = null;
    let styles = null;

    const options = {
        method: "DELETE"
    };

    const response = await fetch(`http://localhost:8000/delete_slot/${slot.uuid}/`, options);
    data = await response.json();
    if (response.status === 400) {
        styles = {
            backgroundColor: 'rgb(253, 159, 142)',
            color: 'rgb(116, 0, 0)',
            border: '1px solid red',
            borderTop: 'none',
            fontWeight: 'normal'
        };
    } else {
        let index = slots.indexOf(slot);
        if (index > -1) slots.splice(index, 1);
    }

    return {
        "message": data.detail,
        "styles": styles,
        "slots": slots
    }
}