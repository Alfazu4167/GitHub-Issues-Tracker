const issuesContainer = document.getElementById("issuesContainer")
const allTab = document.getElementById("allTab")
const openTab = document.getElementById("openTab")
const closedTab = document.getElementById("closedTab")
const count = document.getElementById("count")


const loadIssues = async () => {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    displayIssues(data.data);
    counter()
}

const loadIssueDetails = async (id) => {


    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res = await fetch(url)
    const data = await res.json();
    displayIssueDetails(data.data);


}

const displayIssueDetails = (details => {
    console.log(details);
    //     {
    //     "id": 3,
    //     "title": "Update README with installation instructions",
    //     "description": "The README file needs better installation instructions for new contributors.",
    //     "status": "closed",
    //     "labels": [
    //         "documentation"
    //     ],
    //     "priority": "low",
    //     "author": "mike_docs",
    //     "assignee": "sarah_dev",
    //     "createdAt": "2024-01-10T08:00:00Z",
    //     "updatedAt": "2024-01-12T16:45:00Z"
    // }
    const issueDetails = document.getElementById("details-container");
    issueDetails.innerHTML = `
    <div class="p-4 space-y-5">
                        <h3 class="text-2xl font-bold">${details.title}</h3>
                        <div class="flex gap-2">
                            <div class="">${details.status == "open" ? "<span class='badge badge-success text-white'>Opened</span>" : "<span class='badge bg-red-500 text-white'>Closed</span>"}</div>
                            <p>. <span class="text-[#64748b]">Opened by${details.author}</span>
                            <p>. <span class="text-[#64748b]">${details.createdAt}</span></p>

                        </div>
                        <div class="flex gap-1">
                            <div
                                class="px-1 py-2 rounded-[1000px] bg-[#feecec] text-red-600 border border-red-300 font-bold">
                                <span><i class="fa-solid fa-bug"></i></span>${details.labels[0]}
                            </div>
                            <div
                                class="px-1 py-2 rounded-[100px] bg-[#fff8db] text-[#d97706] border border-yellow-300 font-bold">
                                ${details.labels[1]}</div>
                        </div>
                        <p class="text-[#64748b] line-clamp-2">${details.description}</p>
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-[#64748b]">Assignee:</p>
                                <h2 class="text-lg font-bold">${details.assignee ? details.assignee : "Not fund"}</h2>
                            </div>
                            <div class="space-y-1">
                                <p class="text-[#64748b]">Priority</p>
                                <div class="badge bg-red-500 text-white">${details.priority}
                                </div>
                            </div>
                        </div>
                    </div>
    `
    document.getElementById("my_modal_5").showModal();
})

allTab.addEventListener("click", () => {
    const allBtn = document.querySelectorAll("#tabs button")
    allBtn.forEach(btn => {
        btn.classList.remove("btn-primary")
    })
    allTab.classList.add("btn-primary")
    loadIssues()
    counter()
}

)
openTab.addEventListener("click", async () => {
    const allBtn = document.querySelectorAll("#tabs button")
    allBtn.forEach(btn => {
        btn.classList.remove("btn-primary")
    })
    openTab.classList.add("btn-primary")
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    const openIssues = data.data.filter(issue => issue.status === 'open');
    displayIssues(openIssues);
    counter();
})
closedTab.addEventListener("click", async () => {
    const allBtn = document.querySelectorAll("#tabs button")
    allBtn.forEach(btn => {
        btn.classList.remove("btn-primary")
    })
    closedTab.classList.add("btn-primary")
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    const closedIssues = data.data.filter(issue => issue.status === 'closed');
    displayIssues(closedIssues);
    counter()
})


const displayIssues = (issues) => {
    issuesContainer.innerHTML = ""
    issues.forEach(issue => {

        const card = document.createElement("div")
        card.className = "card p-4 shadow-md space-y-4"
        card.onclick = () => (loadIssueDetails(issue.id))
        card.id = "card-container"

        if (issue.status =="open") {
            const cardContainer = document.getElementById('card-container')
            card.classList.add("border-t-8", "border-t-green-400")
        } else {
            const cardContainer = document.getElementById('card-container')
            card.classList.add("border-t-8", "border-t-purple-400")
        }
        card.innerHTML = `
       <div class="flex justify-between">
                    <div >
                          <img
                             src=${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"} 
                             alt="status" />

                    </div>
                    <div class="px-4 py-2 rounded-[1000px] bg-[#feecec] text-red-600 ">${issue.priority}</div>
                </div>
                <div>
                    <h2 class="text-2xl font-bold">${issue.title}</h2>
                    <p class="text-[#64748b] line-clamp-2">${issue.description}</p>
                </div>
                <div class="flex gap-1">
                    <div class="px-1 py-2 rounded-[1000px] bg-[#feecec] text-red-600 border border-red-300 font-bold"><span><i class="fa-solid fa-bug"></i></span>${issue.labels[0]}</div>
                    <div class="px-1 py-2 rounded-[100px] bg-[#fff8db] text-[#d97706] border border-yellow-300 font-bold">${issue.labels[1]}</div>
                </div>
                <hr class="border-gray-200 px-8">
                <div class="space-y-3">
                    <p class="text-[#64748b]">${issue.author = "undefined" ? issue.author : "Not fund"}</p>
                    <p class="text-[#64748b]">${issue.createdAt}</p>
                </div>
              `


        issuesContainer.appendChild(card)
    });


}
loadIssues()

const counter = () => {
    count.innerText = issuesContainer.children.length

}