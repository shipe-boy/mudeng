
function createMeta(){
	let keywords = ['科技','显示屏', '幕登']
	let description = ['幕登科技', '显示屏']
	
    let metaK = document.createElement('meta')
    let metaD = document.createElement('meta')
    
    metaK.name = 'keywords'
    metaK.content = keywords.join('，')
    metaD.name = 'description'
    metaD.content = description.join('，')
    document.head.appendChild(metaK)
    document.head.appendChild(metaD)
}
createMeta()