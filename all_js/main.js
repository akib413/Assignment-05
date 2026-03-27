let allIssuesData = []

const allIssues = () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'


    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            allIssuesData = data.data
            showAll()
        })
}

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }



const showModal = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => showAllInformation(data.data))
}

// "id": 33,
// "title": "Add bulk operations support",
// "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
// "status": "open",
// "labels": [
// "enhancement"
// ],
// "priority": "low",
// "author": "bulk_barry",
// "assignee": "",
// "createdAt": "2024-02-02T10:00:00Z",
// "updatedAt": "2024-02-02T10:00:00Z"
// }

const showAllInformation = (issue) => {
    console.log(issue)
    const detailsInformation = document.getElementById('details-information')
    detailsInformation.innerHTML = `
        <p class="text-[24px] font-bold">${issue.title}</p>
        <div class="status-author-date flex gap-4 items-center">
            <p class="text-[12px] font-medium px-3 py-1 rounded-full uppercase ${issue.status === 'open' ? 'text-[white] bg-[#00A96E]' : 'text-[#FFFFFF] bg-[#A855F7]'}">${issue.status}</p>
            <p class="author text-[12px] text-[#64748B]">Opened by ${issue.author}</p>
            <p class="date text-[12px] text-[#64748B]">${issue.createdAt}</p>
        </div>
         <div class="bug-help flex gap-2">
            <p class="bug flex items-center text-[12px] font-medium text-[#EF4444] bg-[#FEECEC] rounded-full border-[#FECACA] uppercase"><i class="fa-solid fa-bug"></i>Bug</p>
            <p class="bug flex items-center text-[12px] font-medium text-[#D97706] bg-[#FFF8DB] rounded-full border-[#FDE68A] uppercase"><i class="fa-solid fa-life-ring"></i>help wanted</p>
        </div>
        <div class="description">
            <p class="text-[16px] text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.</p>
        </div>
        <div class="assignee-priority flex bg-[#F8FAFC] p-[16px] gap-28 rounded-lg">
            <div class="assigne">
                <p class="text-[#64748B] text-[16px]">Assignee:</p>
                <p class="font-semibold text-[16px]">Fahim Ahmed</p>
            </div>
            <div class="priority">
                <p class="text-[#64748B] text-[16px]">Priority:</p>
                <p class="text-[12px] font-medium px-3 py-1 rounded-full uppercase text-[#FFFFFF] bg-[#EF4444]">Opened</p> 
            </div>
        </div>
    `
    document.getElementById("my_modal_5").showModal()
}

const setActiveButton = (btnId) => {
    document.getElementById('all-btn').classList.remove('active')
    document.getElementById('open-btn').classList.remove('active')
    document.getElementById('closed-btn').classList.remove('active')

    document.getElementById(btnId).classList.add('active')
}

const showAllIssue = (issues) => {
    const all = document.getElementById('all-issues')
    all.innerHTML = ''



    for (let issue of issues) {
        console.log(issue)

        const issueDiv = document.createElement('div')
        issueDiv.innerHTML = `
        <div class="${issue.status === 'open' ? 'border-3 border-[#00A96E] rounded-t-full' : 'border-3 border-[#A855F7] rounded-t-full'}">
        </div>
        <div onclick="showModal(${issue.id})" class="individual-section shadow-lg p-4 space-y-5 rounded-lg cursor-pointer">
            <div class="status-level flex items-center justify-between">
                <img src="${issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
                <p class="text-[12px] font-medium px-5 py-1 rounded-full uppercase ${issue.priority === 'high' ? 'text-[#EF4444] bg-[#FEECEC]' : issue.priority === 'medium' ? 'text-[#F59E0B] bg-[#FFF6D1]' : 'text-[#9CA3AF] bg-[#EEEFF2]'}">${issue.priority}</p>
            </div>
            <div class="title-description-btn space-y-2">
                <p class="title text-[14px] font-semibold">${issue.title}</p>
                <p class="description text-[12px] text-[#64748B]">${issue.description}</p>
                <div class="bug-help-btn flex gap-2">
                    <p class="bug flex items-center text-[12px] font-medium text-[#EF4444] bg-[#FEECEC] rounded-full border-[#FECACA] uppercase"><i class="fa-solid fa-bug"></i>${issue.labels[0]}</p>
                    <p class="bug flex items-center text-[12px] font-medium text-[#D97706] bg-[#FFF8DB] rounded-full border-[#FDE68A] uppercase">${issue.labels[1] ? '<i class="fa-solid fa-life-ring"></i>' + issue.labels[1] : ''}</p>
                </div>
            </div>
            <hr class="text-[#64748b5c]">
            <div class="credit-time">
                <p class="credit text-[12px] text-[#64748B]">${issue.id} by ${issue.author}</p>
                <p class="date text-[12px] text-[#64748B] pt-2">${issue.createdAt}</p>
            </div>
        </div>
       `

        const countIssues = document.getElementById('count-issues')
        countIssues.innerHTML = `
        <p class="issue-count font-semibold text-[20px]">${issues.length} Issues</p>
        `
        all.append(issueDiv)
    }
}
allIssues()

const showAll = () => {
    setActiveButton('all-btn')
    showAllIssue(allIssuesData)
}

const showOpenIssues = () => {
    setActiveButton('open-btn')

    const openIssues = allIssuesData.filter((issue) => issue.status === 'open')
    showAllIssue(openIssues)
}

const showClosedIssues = () => {
    setActiveButton('closed-btn')

    const closedIssues = allIssuesData.filter(issue => issue.status === 'closed')

    showAllIssue(closedIssues)
}