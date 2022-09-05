export default function (gallery = [], action) {
    if (action.type === "addPhoto") {
        let galleryCopy = [...gallery];
        galleryCopy.push(action.photoInfos)
        return galleryCopy
    } else {
        return gallery
    }

}
