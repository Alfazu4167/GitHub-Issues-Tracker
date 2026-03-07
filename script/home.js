const issuesContainer = document.getElementById("issuesContainer")
const loadIssues = async () => {
    const res = await fetch(" https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    displayIssues(data.data)

}

// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"

const displayIssues = (issues) => {
    issues.forEach(issue => {

        // 
        const card = document.createElement("div")
        card.className = "card p-4 shadow-md space-y-4"
        card.id = "card-container"
        card.innerHTML = `
       <div class="flex justify-between">
                    <div>
                       <img 
  src=${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"} 
  alt="status" 
/>

                    </div>
                    <div class="px-4 py-2 rounded-[1000px] bg-[#feecec] text-red-600 ">${issue.priority}</div>
                </div>
                <div>
                    <h2 class="text-2xl font-bold">${issue.title}</h2>
                    <p class="text-[#64748b] line-clamp-2">${issue.description}</p>
                </div>
                <div class="flex gap-2 justify-between">
                    <div class="pr-3 pl-3 py-2 rounded-[1000px] bg-[#feecec] text-red-600 border border-red-300 font-bold">BUG</div>
                    <div class="px-4 py-2 rounded-[100px] bg-[#fff8db] text-[#d97706] border border-yellow-300 font-bold">HELP WANTED</div>
                </div>
                <hr class="border-gray-200 px-8">
                <div class="space-y-3">
                    <p class="text-[#64748b]">${issue.author}</p>
                    <p class="text-[#64748b]">${issue.createdAt}</p>
                </div>
              `

        
        issuesContainer.appendChild(card)
    });
// if (issue.status == "open") {
//             const cardContainer = document.getElementById('card-container')
//             console.log(cardContainer);
            
//             cardContainer.classList.add("border-t-2 border-t-green-400")
            
//         }

}
loadIssues()