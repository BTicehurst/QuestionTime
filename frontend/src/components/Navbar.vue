<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light my-navbar">
        <div class="container">
            <router-link
                :to="{name: 'home'}"
                class="navbar-brand" 
            >QuestionTime
            </router-link>
            <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link
                        :to="{name: 'home'}"
                        class="btn btn-sm btn-success" 
                    >Home
                    </router-link>
                </li>
                <li class="nav-item mx-1">
                    <router-link
                        :to="{name: 'question-editor'}"
                        class="btn btn-sm btn-danger" 
                    >Ask Question
                    </router-link>
                </li>
                <li class="nav-item">
                    <a class="btn btn-sm btn-outline-secondary" href="/accounts/logout/" >Logout</a>
                </li>
            </ul>

            </div>
        </div>
    </nav>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: "NavbarComponent",

    setup() {
        
    },
})
</script>

<style scoped>
    .my-navbar {
        border-bottom: 1px solid #DDD;
    }

    .navbar-brand {
        font-weight: bold;
        font-size: 130%;       
    }

    .navbar-brand:hover {
        color: #DC3545
    }
</style>