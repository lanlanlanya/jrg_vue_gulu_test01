

<script lang="jsx">
    export default {
        name: "demo2",
        data(){
            return {
                n:9,
                items:[2,4,5,6,7]
            }
        },
        render(h){
            return (
                <div>
                    {this.n>10?  <h3>大</h3>: <h3>小</h3>  }
                    <ul>
                        <li>
                            {this.items.map(i=> <li>{i}</li>)}
                        </li>
                    </ul>
                </div>

            )
        },
    }
</script>

