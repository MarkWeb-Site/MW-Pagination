const pages = [
	[
		"Carrot",
		"Tomato",
		"Broccoli",
		"Cucumber",
		"Spinach"
	],[
		"Potato",
		"Pepper",
		"Eggplant",
		"Lettuce",
		"Onion",
	], [
		"Zucchini",
		"Cauliflower",
		"Kale",
		"Cabbage",
		"Mushroom"
	], [
		"Asparagus",
		"Artichoke",
		"Radish",
		"Beet",
		"Okra"
	], [
		"Brussels Sprouts",
		"Green Bean",
		"Butternut Squash",
		"Turnip",
		"Chard",
	]
]

const mainEl = document.querySelector(".vegetables")
const dotEl = document.querySelector(".selectordotanim")
let pageEls = []

function addcontent() {
	for (let page = 0; page < pages.length; page++) {
		const contentEl = document.createElement("div")
		contentEl.classList.add("page")
		contentEl.innerHTML = pages[page].map((item, index) => itemcard(item, index)).join("")
		contentEl.style.setProperty("--translate", page * 100 + "vh");
		mainEl.appendChild(contentEl)
		
		pageEls.push({box: undefined, content: contentEl})
	}
	
	for (let page = 0; page < pages.length; page++) {
		const boxEl = document.createElement("div")
		boxEl.classList.add("pagescroller")
		mainEl.appendChild(boxEl)
		
		pageEls[page].box = boxEl
	}
}

function itemcard(name, index) {
	return `
		<li style="transition: transform ${500 + index * 50}ms ease ${index * 10}ms">
			<div class="image"></div>
			<div class="name">${name}</div>
   		<center><div class="order">Order</div></center>
		</li>
	`
}

addcontent()


let currentpage = 0
let prevscroll = 0;
mainEl.addEventListener("scroll", (event) => {
	const mainBox = mainEl.getBoundingClientRect()
	const currentBox = pageEls[currentpage].box.getBoundingClientRect()
	const scrollamt = mainBox.top - pageEls[0].box.getBoundingClientRect().top
	if (currentBox.top + 5 < mainBox.top && scrollamt > prevscroll) {
		console.log("scrolled down")
		currentpage = Math.min(currentpage + Math.ceil((scrollamt - prevscroll) / mainBox.height), pageEls.length - 1)
		updatedot()
		for (let page = 0; page < pageEls.length; page++) {
			pageEls[page].content.style.setProperty('--translate', (page - currentpage) * 100 + "vh");
		}
	}
	if (currentBox.top - 5 > mainBox.top && scrollamt < prevscroll) {
		console.log("scrolled up")
		currentpage = Math.max(currentpage - Math.ceil( -1 * (scrollamt - prevscroll) / mainBox.height), 0)
		updatedot()
		for (let page = 0; page < pageEls.length; page++) {
			pageEls[page].content.style.setProperty('--translate', (page - currentpage) * 100 + "vh");
		}
	}
	prevscroll = scrollamt
})

function scrolltopage(page) {
	pageEls[page].box.scrollIntoView();
}
function previouspage() {
	if (currentpage == 0) {return}
	pageEls[currentpage - 1].box.scrollIntoView();
}
function nextpage() {
	if (currentpage == pages.length - 1) {return}
	pageEls[currentpage + 1].box.scrollIntoView();
}

function updatedot() {
	dotEl.style.setProperty("--page", currentpage)
	dotEl.classList.add("pop")
	dotEl.addEventListener("animationend", () => dotEl.classList.remove("pop"))
}
