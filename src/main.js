import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
import * as MyMethods from "@/libraries/methods.js";
// import css
// import '@ocrv/vue-tailwind-pagination/styles'
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
// import 'sweetalert2/src/sweetalert2.scss'
import "vue-multiselect/dist/vue-multiselect.min.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import "@fortawesome/fontawesome-free";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/assets/admin/css/main.css";
import "@/assets/front/css/main.css";
import "@/assets/front/css/dark.css";
import "@/assets/front/css/ltrTheme.css";
// plugins
import VueSlickCarouse from "vue-slick-carousel";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import Vuelidate from "vuelidate";
import Axios from "axios";
import VueImg from "v-img";
import VueCookie from "vue-cookie";
import * as VueMethods from "./libraries/vue-methods";
// import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
// Vue.component('date-picker', VuePersianDatetimePicker);
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import swal from "sweetalert";
import CKEditor from "ckeditor4-vue";

Vue.use(CKEditor);
window.swal = swal;
Vue.use(Toast);
import VueVideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
Vue.use(VueVideoPlayer);
// componentnly
Vue.use(VueCookie);
Vue.use(VueImg);
import VueMeta from "vue-meta";

Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
});
Vue.prototype.$axios = Axios;

Axios.defaults.baseURL = "http://blogtest.ir/api/";
Vue.use(Vuelidate);
// Vue.use(Swal)
Vue.component("VueSlickCarouse", VueSlickCarouse);
Vue.config.productionTip = false;
// از بوتسترپ ویو به صورت محلی استفاده میکنیم

new Vue({
    data() {
        return {
            screenSize: 0,
            baseImageUrl: "http://blogtest.ir/"
        };
    },
    methods: {
        ...MyMethods,
        ...VueMethods,
        setScreen() {
            this.screenSize = screen.width;
            console.log(this.screenSize);
        }
    },
    mounted() {
        this.setScreen();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setScreen);
    },
    created() {
        if (this.$cookie.get("ltrTheme")) {
            this.$axios.defaults.headers.common["Accept-Language"] = "en";
        } else {
            this.$axios.defaults.headers.common["Accept-Language"] = "fa";
        }
        window.addEventListener("resize", this.setScreen);
        this.$axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response.status === 401) {
                    // this.$notify({
                    //     group: "foo",
                    //     title: "پیام سیستم",
                    //     text: error.response.data.message,
                    //     type: "error",
                    //     duration: "5000"
                    // });
                    this.$cookie.delete("Authorization");

                    router.push("/login");
                }
                throw error;
            }
        );
        if (this.$cookie.get("Authorization")) {
            this.$axios.defaults.headers.common["authorization"] =
                "Bearer " + this.$cookie.get("Authorization");
        }
    },
    router,
    store,
    render: function(h) {
        return h(App);
    }
}).$mount("#app");