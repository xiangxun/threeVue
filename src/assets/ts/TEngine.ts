import { ACESFilmicToneMapping, AmbientLight, Box3, BoxBufferGeometry, LoadingManager, Mesh, MeshLambertMaterial, MeshStandardMaterial, MOUSE, PerspectiveCamera, PointLight, Raycaster, Scene, SphereGeometry, sRGBEncoding, TextureLoader, Vector2, Vector3, WebGLCubeRenderTarget, WebGLRenderer } from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import Stats from "three/examples/jsm/libs/stats.module";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';


export class TEngine{

    private dom:HTMLElement
    private renderer:WebGLRenderer
    private scene:Scene
    private camera:PerspectiveCamera
    private loader:TextureLoader
    // private controls:OrbitControls

    constructor(dom:HTMLElement){

        //object
        //当前选中物体
        let currentObject = {}

        //之前选中的物体
        let lastObject = {}

        this.dom = dom
        //渲染 antialias抗锯齿
        this.renderer = new WebGLRenderer({antialias:true})
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.toneMapping = ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        // this. renderer.outputEncoding = sRGBEncoding;

        // 新建场景
        this.scene = new Scene()
        // 新建透视相机
        // this.camera = new PerspectiveCamera(45,dom.offsetWidth/dom.offsetHeight,0.1,1000);

        this.camera= new PerspectiveCamera(60,window.innerWidth/window.innerHeight)
        this.camera.position.set(100,100,100);
        this.camera.lookAt(new Vector3(10,10,10));
        // this.camera.position.z=500
        this.scene.add(this.camera)

        //使用后处理模块
        const composer= new EffectComposer(this.renderer)
        //渲染通道
        const renderPass=new RenderPass(this.scene,this.camera)
        composer.addPass(renderPass)
        //高亮边框通道
        const outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), this.scene, this.camera);
        outlinePass.edgeStrength = 10;
        outlinePass.edgeGlow = 0.1;
        outlinePass.edgeThickness = 1;
        //outlinePass.pulsePeriod = 2;
        outlinePass.visibleEdgeColor.set('#ff0055');
        outlinePass.hiddenEdgeColor.set('#ffff00');
        composer.addPass(outlinePass);






        // 3D背景
        this.loader = new TextureLoader();
        const texture = this.loader.load(
        //   'https://threejsfundamentals.org/threejs/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg',
        '/loader/hdr/hilly.jpg',
            // 'https://i.loli.net/2021/11/09/bdgf4T5D1siRpvK.jpg',
          () => {
            const rt = new WebGLCubeRenderTarget(texture.image.height);
            rt.fromEquirectangularTexture(this.renderer, texture);
            this.scene.background = rt.texture;
          });



          let sceneReady=false
          const loadingManager=new LoadingManager(
              //loaded 载入完成
              ()=>{
                  console.log("载入完成")
                  sceneReady=true
                  console.log("scene===",this.scene)
              },
              //Progress 载入过程
              
              (itemUrl, itemsLoaded, itemsTotal) => {
                  console.log("载入中...", itemsLoaded)
              }
          
          )
          
          
          const dracoLoader=new DRACOLoader()

          dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/')
          
          const gltfLoader=new GLTFLoader(loadingManager)
          gltfLoader.setDRACOLoader(dracoLoader)
          gltfLoader.load(
              'loader/dracoModel/dracoRoom.gltf',
            //   '../loader/dracoModel/dracoRoom.gltf',
              (gltf)=>{
                  const object = gltf.scene || gltf.scene[0]
          
                  //1.调整物体位置
                  const box = new Box3().setFromObject(object)
                  const size = box.getSize(new Vector3()).length()
                  const center = box.getCenter(new Vector3())
                  object.position.x += (object.position.x - center.x);
                  object.position.y += (object.position.y - center.y);
                  object.position.z += (object.position.z - center.z);
                  //2.调整相机位置
                //   this.camera.near = size / 100
                //   this.camera.far = size * 100
                //   this.camera.updateProjectionMatrix()
          
                //   this.camera.position.copy(center)
                //   this.camera.position.x += size/2.0
                //   this.camera.position.y += size/2.0
                //   this.camera.position.z += size/2.0
                //   this.camera.lookAt(center)
                  this.scene.add(object)
                  console.log("scene===",this.scene);
          
              }
          )


        //设置轨道控制
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        const orbitControls:OrbitControls = new OrbitControls(this.camera, this.renderer.domElement)
        orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        //设置鼠标键位
        orbitControls.mouseButtons = {
            // LEFT: null as unknown as MOUSE,
            LEFT:MOUSE.ROTATE,
            MIDDLE: MOUSE.PAN,
            RIGHT:MOUSE.ROTATE,
        }

        //resize 加入大小尺寸的控制
        window.addEventListener('resize',()=>{
            //更新相机
            this.camera.aspect=window.innerWidth/window.innerHeight
            this.camera.updateProjectionMatrix()
            //更新渲染
            this.renderer.setSize(window.innerWidth,window.innerHeight)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
        })




        //使用射线法
        const raycaster =new Raycaster()
        //mouse
        const mouse= new Vector2()

        window.addEventListener('mousemove',(event)=>{
            mouse.x = event.clientX / window.innerWidth * 2 - 1
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
        })
        window.addEventListener('click',()=>{
            if(JSON.stringify(currentObject)!='{}' && currentObject != undefined && currentObject != null&& currentObject != lastObject){
                console.log("选中了")
                console.log("click",currentObject)
                lastObject=currentObject
                // prDiv.style.visibility='visible'
            //    generateTable(currentObject.userData)
        
                let outlineObjcets = [];
                outlineObjcets.push(currentObject)
                outlinePass.selectedObjects = outlineObjcets
        
        
            }else{
                console.log("没有选中")
                lastObject={}
                currentObject={}
                outlinePass.selectedObjects=[]
            }
        })




        console.log(dom)
        dom.appendChild(this.renderer.domElement)
        this.renderer.setSize(dom.offsetWidth,dom.offsetHeight,true)

        //添加环境光
        const ambientLight : AmbientLight = new AmbientLight(0x00ffff);
        this.scene.add(ambientLight);
        // 添加点光源
        const pointlight:PointLight = new PointLight( 0xffffff, 5, 100 );
        pointlight.position.set( 50, 50, 50 );
        this.scene.add( pointlight );

        // 设置几何体
        // const box:Mesh = new Mesh(
        //     new BoxBufferGeometry(10,10,10),
        //     new MeshStandardMaterial({color:0xffff00})
        // )
        // this.scene.add(box);
        // const geometry = new SphereGeometry( 6, 32, 16 );
        // const material = new MeshLambertMaterial( { color: 0xffffee } );
        // const sphere = new Mesh( geometry, material );
        // this.scene.add( sphere );

        //设置性能监视器
        const stats = Stats()
        // const statsDom = stats.domElement
        // dom.appendChild(statsDom);
        dom.appendChild(stats.domElement)

        // this.renderer.setClearColor('rgb(255,255,255)')
        // this.renderer.clearColor();


        //设置动画
        const renderFun =() =>{

            if (sceneReady) {
                raycaster.setFromCamera(mouse,this.camera)
                const intersects = raycaster.intersectObjects(this.scene.children[3].children[0].children)
                if (intersects.length>0) {
                    const selectedObject = intersects[0].object
                    if (currentObject != selectedObject) {
                        currentObject=selectedObject
                    }
                } else {
                    currentObject={}
                }
            }





            console.log(1)
            this.renderer.render(this.scene, this.camera)
            stats.update();
            composer.render();
            orbitControls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
            requestAnimationFrame(renderFun)
        }

        renderFun();

        dom.appendChild(this.renderer.domElement)
        // this.controls.update();
        
    }
}
