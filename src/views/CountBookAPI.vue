<script>
import axios from 'axios';

export default {
    data() {
        return {
            jsondata: null,
            error: null,
        };
    },
    mounted() {
        this.getBookCountAPI();
    },
    computed: {
        jsonFormat() {
        return this.jsondata ? JSON.stringify(this.jsondata, null, 2) : '';
        }
    },
    methods: {
        async getBookCountAPI() {
            try {
                const response = await axios.get('https://us-central1-week7-ailin.cloudfunctions.net/listBooks')
                this.jsondata = response.data;
                this.error = null;
            } catch (error) {
                console.error('Error fetching book count:', error);
                this.error = error;
                this.jsondata = null;
            }
        },
    },
};
</script>

<template>
    <pre>{{ jsonFormat }}</pre>
</template>