import { AmbientLight, BoxBufferGeometry, Mesh, MeshLambertMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, Vector3, WebGLRenderer } from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import Stats from "three/examples/jsm/libs/stats.module";

export class TEngine{

    private dom:HTMLElement
    private renderer:WebGLRenderer
    private scene:Scene
    private camera:PerspectiveCamera
    private controls:OrbitControls

    constructor(dom:HTMLElement){
        this.dom = dom
        this.renderer = new WebGLRenderer()
        // 新建场景
        this.scene = new Scene()
        // 新建透视相机
        this.camera = new PerspectiveCamera(45,dom.offsetWidth/dom.offsetHeight,1,1000);
        this.camera.position.set(20,20,20);
        this.camera.lookAt(new Vector3(0,1,0));

        //设置轨道控制
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);


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
        const box:Mesh = new Mesh(
            new BoxBufferGeometry(10,10,10),
            new MeshStandardMaterial({color:0xffff00})
        )
        this.scene.add(box);
        const geometry = new SphereGeometry( 6, 32, 16 );
        const material = new MeshLambertMaterial( { color: 0xffffee } );
        const sphere = new Mesh( geometry, material );
        this.scene.add( sphere );

        //设置性能监视器
        const stats = Stats()
        // const statsDom = stats.domElement
        // dom.appendChild(statsDom);
        dom.appendChild(stats.domElement)

        // this.renderer.setClearColor('rgb(255,255,255)')
        // this.renderer.clearColor();

        //设置动画
        const renderFun =() =>{
            console.log(1)
            box.position.x += 0.001
            box.rotation.x += 0.01
            this.renderer.render(this.scene, this.camera)
            stats.update();
            requestAnimationFrame(renderFun)
        }

        renderFun();

        dom.appendChild(this.renderer.domElement)
        // this.controls.update();
        
    }
}