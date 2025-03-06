<template>
    <el-row class="footerSection">
        <el-col :span="5">
            <h4 style="font-weight: 500;">COMPANY</h4>
            <a :href="item.nameUrl" v-for="item in footerDetails.company" :key="item">{{ item.name }}</a>
        </el-col>
        <el-col :span="5">
            <h4 style="font-weight: 500;">WORK WITH US</h4>
            <a :href="item.nameUrl" v-for="item in footerDetails.workWithUs" :key="item">{{ item.name }}</a>
        </el-col>
        <el-col :span="5">
            <h4 style="font-weight: 500;">CONNECT</h4>
            <div class="socialIcons">
                <a v-for="item in footerDetails.connect" :key="item" :href="item.nameUrl">
                    <img :src="item.icon" />
                </a>
            </div>
        </el-col>
        <el-col :span="4"></el-col>
        <el-col :span="5">
            <div class="storeIcons">
                <a v-for="item in footerDetails.storeIcons" :key="item" :href="item.icon">
                    <img :src="item.icon" style="width: 100%;"/>
                </a>
            </div>
            <p>&copy;2025</p>
        </el-col>
    </el-row>
</template>
<script setup>
import facebookIcon from './icons/facebook.png'
import instagramIcon from './icons/instagram.png'
import twitterIcon from './icons/twitter.png'
import linkdinIcon from './icons/linkedin.png'
import googleStoreIcon from './icons/googleStore.png'
import appleStoreIcon from './icons/appleStore.png'


const footerDetails = {
    company: [
        { name: 'About us', nameUrl: "/" },
        { name: 'Careers', nameUrl: "/" },
        { name: 'Terms', nameUrl: "/" },
        { name: 'Privacy', nameUrl: "/" },
        { name: 'Help', nameUrl: "/" },
    ],
    workWithUs: [
        { name: 'Authors', nameUrl: "/" },
        { name: 'Advertise', nameUrl: "/" },
        { name: 'Authors & ads blog', nameUrl: "/" },
    ],
    connect: [
        { icon: facebookIcon, nameUrl: 'https://www.facebook.com' },
        { icon: instagramIcon, nameUrl: 'https://www.instagram.com' },
        { icon: twitterIcon, nameUrl: 'https://www.twitter.com' },
        { icon: linkdinIcon, nameUrl: 'https://www.linkedin.com' },
    ],
    storeIcons: [
        { icon: googleStoreIcon, nameUrl: 'https://www.google.com' },
        { icon: appleStoreIcon, nameUrl: 'https://www.apple.com' },
    ]
}
</script>
<style scoped>
.footerSection{
    background-color: rgb(248, 243, 238);
    padding: 2rem 10rem;
}
.footerSection a {
    display: block;
    color: rgb(75, 72, 72);
    line-height: 1.2;
}

.footerSection a:hover {
    text-decoration: underline;
}

.footerSection .socialIcons {
    width: 9rem;
    display: flex;
    justify-content: space-between;
}

.footerSection .socialIcons img {
    width: 30px;
}
.footerSection .socialIcons img:hover {
    scale: 1.1;
}
.footerSection .storeIcons {
    display: flex;
    scale: 1.1;
}
.footerSection .storeIcons :hover{
    scale: 1.02;
}
</style>