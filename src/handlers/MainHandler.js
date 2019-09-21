/*
* DEFAULT HANDLER
*/

const MainDefaultState = {
	list: [],
	list2: []
};

export default {
	MainDefaultState,
	MainHandler: {
		'ADD-TO-DONE': (action, state) => {
			
			const selectedItem = state.Main.list[action.i];
			state.Main.list.splice(action.i, 1);
			state.Main.list2.push(selectedItem);
			return { newState: state };
		},
		'DELETE-ITEM': (action, state) => {
			console.log(state, action);
			state.Main.list = state.Main.list.filter((item) => { return item.id !== action.id })
			state.Main.list2 = state.Main.list2.filter((item) => { return item.id !== action.id })
			
			return { newState: state }
        },
        'ADD-TO-DO': (action, state) => {
            state.Main.list.push(action.item)
            return { newState: state }
        }
	}
};