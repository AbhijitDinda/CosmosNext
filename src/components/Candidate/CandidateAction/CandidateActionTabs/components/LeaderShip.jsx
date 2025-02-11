const LeaderShip = ({ title, description ,characteristics ,challenges,key_strengths,communication,motivation_techniques}) => {
    // console.log("key",key)
    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-700 font-semibold mt-2">
                
            </p>

            <p className="text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html:description}} />

            <p className="font-semibold pt-8">Characteristics of a Transformational leader: </p>

            <p className="text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html:characteristics}} />
            
            <p className="font-semibold pt-8">Challenges with employees driven by Competence Motivation:</p>

            <p className="text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html:challenges}} />

            <p className="font-semibold pt-8">Key strengths of a Transformational leader</p>

            <p className="text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html:key_strengths}} />

            <p className="font-semibold pt-8">Communication style of a transformational leader</p>

            <p className="text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html:communication}} />

            <p className="font-semibold pt-8">Motivation techniques used by Transformational leader (for others)</p>

            <p className="text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html:motivation_techniques}} />


        </div>
    );
};

export default LeaderShip;
