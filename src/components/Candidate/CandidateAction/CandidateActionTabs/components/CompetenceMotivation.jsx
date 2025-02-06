const CompetenceMotivation = ({ title, type, description ,behaviors ,challenges}) => {
    return (
        <div className="w-full md:w-4/6 mx-auto">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-700 font-semibold mt-2">
                <span className="font-bold">Type:</span> {type}
            </p>

            <p className="text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html:description}} />

            <p className="font-semibold pt-8">Common behaviours associated with Competence motivation include: </p>

            <p className="text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html:behaviors}} />
            
            <p className="font-semibold pt-8">Challenges with employees driven by Competence Motivation:</p>

            <p className="text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html:challenges}} />


        </div>
    );
};

export default CompetenceMotivation;
