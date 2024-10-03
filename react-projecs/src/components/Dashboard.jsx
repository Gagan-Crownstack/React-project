import { BodyWrapper } from "../constant/BodyWrapper"
import PokeTable from "./PokeTable"

const Dashboard = () => {
  return (
    <BodyWrapper>
        <div className="h-full flex flex-col gap-5 overflow-y-scroll">
            <div className="text-3xl">Pokecard</div>
            
            {/* Pokemon table structure defined here  */}
            <PokeTable/>
        </div>
    </BodyWrapper>
  )
}

export default Dashboard