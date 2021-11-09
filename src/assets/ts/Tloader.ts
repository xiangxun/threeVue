// import { Box3, LoadingManager, Vector3 } from "three";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'



// let sceneReady=false
// const loadingManager=new LoadingManager(
//     //loaded 载入完成
//     ()=>{
//         console.log("载入完成")
//         sceneReady=true
//         console.log("scene===",scene)
//     },
//     //Progress 载入过程
    
//     (itemUrl, itemsLoaded, itemsTotal) => {
//         console.log("载入中...", itemsLoaded)
//     }

// )


// const dracoLoader=new DRACOLoader()
// dracoLoader.setDecoderPath('./models/draco/')

// const gltfLoader=new GLTFLoader(loadingManager)
// gltfLoader.setDRACOLoader(dracoLoader)
// gltfLoader.load(
//     './models/compressmodel/dracoHotelA3.gltf',
//     (gltf)=>{
//         const object =gltf.scene || gltf.scene[0]

//         //1.调整物体位置
//         const box = new Box3().setFromObject(object)
//         const size = box.getSize(new Vector3()).length()
//         const center = box.getCenter(new Vector3())
//         object.position.x += (object.position.x - center.x);
//         object.position.y += (object.position.y - center.y);
//         object.position.z += (object.position.z - center.z);
//         //2.调整相机位置
//         camera.near = size / 100
//         camera.far = size * 100
//         camera.updateProjectionMatrix()

//         camera.position.copy(center)
//         camera.position.x += size / 2.0
//         camera.position.y += size / 5.0
//         camera.position.z += size / 2.0
//         camera.lookAt(center)

//         scene.add(object)
//         console.log("scene===",scene);

//     }
// )