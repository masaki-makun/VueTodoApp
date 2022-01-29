<template>
    <div id="todo-list">
		<div class="title">
			<h1 class="title__main">Todo List</h1>
			<span class="title__sub">Todoを登録して、今日1日の目標を成し遂げましょう！</span>
		</div>
        <transition-group name="todo-list" tag="ul">
            <li v-for="item in todoByStatus" :key="item.id" :class="item.done ? 'done' : ''">
                <span class="label">{{item.label}}</span>
                <div class="action-buttons">
                    <button class="pictogram" type="button" @click="markAsDoneOrUndone(item)" :aria-label="item.done ? 'Undone' : 'Done'" :title="item.done ? 'Undone' : 'Done'">
                        <fa-icon :icon="item.done?'check':'check-square'" aria-hidden="true" class="icon">{{item.done ? 'check_box' : 'check_box_outline_blank'}}</fa-icon>
                    </button>
                    <button class="pictogram" type="button" @click="deleteItemFromList(item)" :aria-label="Delete" :title="Delete">
                        <fa-icon icon="trash-alt" aria-hidden="true" class="icon">Delete</fa-icon>
                    </button>
                </div>
            </li>
        </transition-group>
		<div class="sort">
			<p class="sort__text">未完了のTodo順に表示</p>
			<input name="sort-button" class="sort__button" type="checkbox" @change="clickOnToggle">
		</div>
        <p v-if="!todo.length" class="empty-list-text">現在のTodoは空です。</p>
        <form name="input-form" class="input-form" @submit.prevent="addItem">
            <label class="input-form__text" for="new-item">項目を入力し、Todoに追加しましょう。</label>
            <input type="text" name="new-item" id="new-item" v-model="newItem">
            <button class="input-form__submit" type="submit">追加</button>
        </form>
    </div>
</template>



<script>
export default {
    props:['label','name'],
    data(){
        return{
            isActive:false,
            newItem:'',
            sortByStatus:false,
            todo:[
                {id:1, label:'Todo1',done:false},
                {id:2, label:'Todo2',done:false},
                {id:3, label:'Todo3',done:false},
            ]
        }
    },
    methods:{
        onToggle:function(){
            this.$emit('clicked',this.isActive);
        },
        addItem:function(){
            this.todo.push({id:Math.floor(Math.random()*9999)+10, label:this.newItem, done:false});
            this.newItem='';
        },
        markAsDoneOrUndone:function(item){
            item.done= !item.done;
        },
        deleteItemFromList:function(item){
            let index=this.todo.indexOf(item);
            if(confirm('削除してもよろしいですか')){
                this.todo.splice(index,1);
            }
        },
        clickOnToggle:function(){
			if(this.sortByStatus===true){
				this.sortByStatus=false;
			}else{
				this.sortByStatus=true;
			}
        },
    },
   computed: {
    todoByStatus: function() {
      if(!this.sortByStatus) {
        return this.todo;
      }
      var sortedArray = []
      var doneArray = this.todo.filter(function(item) { return item.done; });
      var notDoneArray = this.todo.filter(function(item) { return !item.done; });
      sortedArray = [...notDoneArray, ...doneArray];
      return sortedArray;
    }
  }


}
</script>



<style scoped>
* {
	margin:0;
	padding:0;
	box-sizing:border-box;
}
html, body {
	background:#f7f1f1;
	font-size:1.1rem;
	font-family:'Quicksand', sans-serif;
	height:100%;
}
@keyframes strikeItem {
	to { width:calc(100% + 1rem); }
}


/* LIST */
#todo-list {
	margin:4rem auto;
	padding:2rem 3rem 3rem;
	max-width:500px;
	background:#3D47AF;
	color:#FFF;
	box-shadow:10px 10px 23px 4px rgba(61, 71, 175, .6);
}
#todo-list .title__main {
    font-weight:bold;
    font-size:2.6rem;
    letter-spacing:0.05em;
    border-bottom:1px solid rgba(255,255,255,.3);
}
#todo-list .title__sub {
	display:block;
	font-size:0.9em;
	margin:.5rem 3px .7rem 0;
}

#todo-list .empty-list-text {
	margin-top:2.6rem;
	text-align:center;
	letter-spacing:.05em;
	font-style:italic;
	opacity:0.8;

}
#todo-list ul {
	margin-top:2.6rem;
	list-style:none;
}
#todo-list .todo-list-move {
	transition: transform 1s;
}
#todo-list li {
	display:flex;
	margin:0 -3rem 4px;
	padding:1.1rem 3rem;
	justify-content:space-between;
	align-items:center;
	background:rgba(10,21,90,.9);
	transition : background .5s ease-out;

}
#todo-list .action-buttons {
	flex-shrink:0;
	padding-left:0.7em;
}
#todo-list .label {
	position:relative;
	transition:opacity .2s linear;
}
#todo-list .done {
	background: rgba(10,21,90,.5);
}
#todo-list .done .label {
	opacity:.4;
}
#todo-list .done .label:before {
	content:'';
	position:absolute;
	top:50%;
	left:-.5rem;
	display:block;
	width:0%;
	height:1px;
	background:#FFF;
	animation:strikeItem .3s ease-out 0s forwards;
}
#todo-list .pictogram {
	border:none;
	background:none;
	-webkit-appearance:none;
	cursor:pointer;
	color:#FFF;
}
#todo-list .pictogram:first-child {
	padding-right: 10px;
}


/* FORM */
form {
	margin-top:3rem;
	display:flex;
	flex-wrap:wrap;
}
form label {
	min-width:100%;
	margin-bottom:.5rem;
	font-size:1.3rem;
}
form input {
	flex-grow:1;
	border:none;
	background:#e9e9eb;
	padding:0 1.5em;
	font-size:initial;
	transition : background .2s ease-in;
}
form input:focus {
	border:none;
	outline:none;
	background:#f7f1f1;
}
form button {
	padding:0 1.3rem;
	border:none;
	background:#D103FC;
	color:white;
	text-transform:uppercase;
	font-weight:bold;
	margin-left:5px;
	cursor:pointer;
	transition:background .2s ease-out;
}
form button:hover {
	background:rgba(209,3,252,.5);
}
form input,
form button {
	font-family:'Quicksand', sans-serif;
	height:3rem;
}


/* TOGGLE COMPONENT */
.toggleButton-wrapper {
	margin-top:1em;
}
.toggleButton-wrapper label {
    display:flex;
    justify-content:flex-end;
    align-items:center;
}
.toggleButton-wrapper input {
	position:absolute;
    left:-9999px;
}
.toggleButton-wrapper .toggleButton-label {
	font-size:.8rem;
	letter-spacing:.1em
}
.toggleButton-wrapper .toggleButton-box {
	position:relative;
	display:block;
	margin-left:0.6em;
	width:38px;
	height:22px;
	background:white;
	border-radius:999px;
	cursor:pointer;
}
.toggleButton-wrapper .toggleButton-box:before {
	content:'';
	position:absolute;
	top:2px; left:2px;
	display:block;
	width:18px; height:18px;
	border-radius:50%;
	background:#FF6666;
	opacity:0.7;
	transition:	all .2s ease-in-out;
}
.toggleButton-wrapper.toggleButton-focus .toggleButton-box {
	box-shadow:0px 0px 0px 3px rgba(0,0,0,0.1);
}
.toggleButton-wrapper.toggleButton-checked .toggleButton-box:before {
	left:calc(100% - 4px - 16px);
	opacity:1;
}
.title{
	text-align: left;
}
.sort{
  position: relative;
  width: 100%;
  height: 20px;
  margin: 10px 0;
  border: none;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.sort__button{
	visibility: hidden;
	display: block;
	cursor: pointer;
}
.sort__button::before{
	visibility: visible;
     position: absolute;
    top: 0;
    right: 0;
    content: '';
    width: 50px;
    height: 100%;
    display: block;
    background: #e9e9eb;
    transition: 0.2s ease-out;
    border-radius: 50px;
}
.sort__button::after{
	position: absolute;
	visibility: visible;
    top: 1px;
    right: 4px;
    content: '';
    width: 18px;
    height: 18px;
    display: block;
    border-radius: 50px;
    background: #fff;
    box-shadow: 0 9px 28px -6px rgb(0 0 0 / 30%);
    transition: 0.2s ease-out;
}
.sort__button:checked::before{
 background: #D103FC;
}
.sort__button:checked::after{
 right: 28px;
 box-shadow: 0 9px 28px -6px rgba(0, 0, 0, 0.5);
 }
 .input-form__text{
	font-size: 1rem;
	text-align: left;
 }
 .sort__text{
	font-size: .8em;
 }

</style>
