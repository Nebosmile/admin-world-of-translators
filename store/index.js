import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
		state: {
			user: '12345t6',
			access: true,
			token:'',
		},
		mutations: {
			userLogin(date) {
				this.state.user = date;
				this.state.access = true;
			},
			changeState(){
				if(this.state.access){
					this.state.access=false
				}else{
					this.state.access=true
					this.state.user='nebosmile';
				}

			},
			setToken(state,token){
				state.token=token;
			}
		}
	})
}

export default createStore
