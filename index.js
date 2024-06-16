const Banner = document.querySelector(".Main-Banner");
const Assets = document.querySelector(".Assets");
const BoardButton = document.querySelector(".RightImg")
let Data = ""


window.addEventListener('load', ()=>{
    fetch('./Assets/ProjectM.json')
    .then(res=>res.json())
    .then(data=> {
       Data = data;
        const TaskData = data.tasks;
        DisplayTask(TaskData);
        // DisplayAssets(AssetsData)
        data.tasks[0].assets.map(asset=>{
            DisplayAssets(asset);
        })
    })
    .catch(err=>console.log(err));
})


// Making the Board Epand and collaps 

BoardButton.addEventListener('click',()=>{
    const Board = document.querySelector(".LeftBanner");
    let BoardData = document.querySelector(".BoardData");
    let BoardMainHeading = document.querySelector(".LeftBannerHeading p");


    if(Board.classList.contains('Expanded')){
        Board.classList.remove('Expanded');
        BoardButton.src= "./Assets/Right_Arrow.png";

        if(BoardData){
            BoardData.style.display="none"
            BoardMainHeading.style.display="none"
        }
       
    }
    else{
        Board.classList.add('Expanded');
        BoardButton.src = "./Assets/left_Arrow.png";

        
        if (!BoardData) {
            const BoardData = document.createElement('div');
            BoardData.classList.add('BoardData');          // Adding  a class to identify the div
            const BoardHeading = `<ul ><li class= "BoardHeading">${Data.tasks[0].task_title}</li><ul>`;
            const BoardLists = Data.tasks[0].assets.map((data)=>{
                return `<ul><li class="BoardList">${data.asset_title}</li></ul>`
            }).join('')
            BoardData.innerHTML = BoardHeading + `<div class="BoardLiContainer">${BoardLists}</div>` ;
            BoardMainHeading.textContent= "Journey Board";
            Board.appendChild(BoardData);
            
        }
        else{
            BoardData.style.display = 'block';
            BoardMainHeading.style.display= 'block'
        }
        
        
    }
    // alert("it's working")
    

})

// function for the the displying the Tasks
const DisplayTask=(data)=>{

    // creagint the Banner Heading 
    const BannerHeading = document.createElement('p');
    BannerHeading.textContent= data[0].task_title;
    BannerHeading.className= "BannerHeading";

    // creating the Banner Para content 

    const BannerPara = document.createElement('p');
    BannerPara.textContent=data[0].task_description;
    BannerPara.className='BannerPara';

    // Appending the elements to the Main Banner Element
    Banner.appendChild(BannerHeading);
    Banner.appendChild(BannerPara);
}


// functionf for the displaying the assets:

const DisplayAssets=(data)=>{
    const AssetCotainer = document.createElement('div');
    AssetCotainer.className= 'AssetContainer';

    // creating the Asset Title 
    const AssetTitle = document.createElement('p');
    const AssetTitleDes = document.createElement('span')
    AssetTitleDes.className = 'AssetTitleDes';
    AssetTitle.className = 'assetTitle';
    AssetTitle.textContent= data.asset_title;
    AssetTitleDes.textContent='i'
    AssetTitle.appendChild(AssetTitleDes)
    
    // Appending the Asset Tilte Element to the it's container(Asset Container)
        AssetCotainer.appendChild(AssetTitle);

    // Creating the Asset Description Element
    const AssetDes = document.createElement('p');
    const Bold = document.createElement('b');
    Bold.textContent=  "Description: ";
    AssetDes.className= 'AssetDes';
    AssetDes.textContent =  data.asset_description;

    
    // Appeding the AssetDescription to the Asset container
    AssetDes.insertBefore(Bold, AssetDes.firstChild);
    AssetCotainer.appendChild(AssetDes);
    


    if(data.asset_content_type === 'video'){
        const AssetVideo = document.createElement('iframe');
        AssetVideo.className = 'AssetVideo';
        AssetVideo.src = data.asset_content;
        AssetVideo.width= '100%';
        AssetVideo.height= '315';

        AssetCotainer.appendChild(AssetVideo);
    }

    else if(data.asset_content_type === 'threadbuilder'){
        const AssetThread = document.createElement('div');
        const ThreadContent = document.createElement('div');
        ThreadContent.className= 'ThreadDiv';

        

        const ThreadMenu = `<div class="ThreadMenu"><img src="./Assets/IdeoBulb.svg" alt="New Idea"/><img src="/Assets/MessageIcon.svg" alt="Message"/><img src="./Assets/questionIcon.svg" alt="Help"/><img src="./Assets/candle.svg" alt="Candle"/><select id="Cantagary"><option>Select Categ</option></select><select id="Process"><option>Select Proces</option></select> <button>+ Submit Thread</button><div class="ThreadSummary"><span>Summary of Thread A </span> <input name="InputHere" type="text" placeholder="Enter Text Here"/></div></div>`

        let ThreadContentHtml =`<div class="ContentHeading"><img src="./Assets/UpArrow.svg" alt="UpArrow"/> <p>Thread A</p> </div>`;

        const ThreadInput =`<div class = "ThreadInputs"><div class="InputItem"><p>Sub thread 1</p><input name="AssetInput" type="text" placeholder="Enter Text here"/></div><div class="InputItem"><p>Sub Interpretations 1</p><input name="ThreadInput" type="text" placeholder="Enter Text here"/></div></div>`;

        
        ThreadContent.innerHTML = (ThreadContentHtml+ ThreadInput) + ThreadMenu ;
        
        
        AssetThread.appendChild(ThreadContent);
        AssetThread.className = 'AssetThread';
        AssetCotainer.appendChild(AssetThread);

    }

    else{

        const contentArr = ["File",  "Edit", "View", "Insert", "Format", "Tools", "Table", "Help"];
        const ImgPath = ["./Assets/arrow-curve-left-right.svg", "./Assets/arrow-curve-left-down.svg", "./Assets/arrow-expand-02.svg"]
        const AssetArticle = document.createElement('div');
        AssetArticle.className = 'AssetArticle';
        
        // getting the required HTML code using asset_id
        if(data.asset_id == "18885") {
        const PointersContent = document.createElement('div');
        PointersContent.className = "pointersContent";

        // To get the tool list
        const contentTools= contentArr.map((ele)=>{
            return `<ul><li>${ele}</li></ul>`;
        }).join('');

        const ToolsImg = ImgPath.map((url, ind)=>{
            return `<img src=${url} alt=${ind}/>`
        }).join('')

        const pointerContentIn = `<div class="pointerContentIn"><p>Content</p><div class="contentTools">${contentTools} <div class="ToolsImg">${ToolsImg} <span id="toolPara">Paragraph</span><div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div> </div></div> <input id="inputText" type="text"/></div>`
        const pointerTitle = `<div class="pointerTitle"><p>Title</p><input name="titleInput" type="text"/></div> ${pointerContentIn} `;
        

        PointersContent.innerHTML= pointerTitle;
        AssetArticle.appendChild(PointersContent);

        }

        else if(data.asset_id == "18886"){
            const ArticaleContent = document.createElement('div');
            ArticaleContent.className= "ArticaleContent";

            const SaHeading = `<div class = "SaHeading"><img src="./Assets/UpArrow.svg" alt="More"><p>Introduction </p></div>`

            const IntroContent = `<div class = "introContent"><p class="content">The 4SA Method , How to bring a idea into progress ?</p><p class="more">See More<p></p></div>`;

            const MainContent = `<div class="mainContent"><div class="mainHeading"><img src="./Assets/UpArrow.svg" alt="more" /><p>Thread A</p></div> <div class="Mainpara"><p>How are you going to develop your stratergy ? Which method are you going to use to develop a stratergy ? What if the project is lengthy?</p><p class="more">See More</p></div></div>`;

            const Example = `<div class="Example"><div class="ExampleHeading"><p>Example 1</p></div><p>You have a concept , How will you put into progress?</p></div>`

            ArticaleContent.innerHTML=SaHeading + IntroContent + MainContent + Example


            AssetArticle.appendChild(ArticaleContent);
        }

        AssetCotainer.appendChild(AssetArticle)
    }

    Assets.appendChild(AssetCotainer);
}






