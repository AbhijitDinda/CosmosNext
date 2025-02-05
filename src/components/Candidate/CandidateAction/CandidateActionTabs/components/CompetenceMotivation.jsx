const CompetenceMotivation = ({ title, type, description = [], examples = [] }) => {
    return (
        <div className="w-full md:w-4/6 mx-auto">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-700 font-semibold mt-2">
                <span className="font-bold">Type:</span> {type}
            </p>
            {description.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mt-4">
                    {paragraph}
                </p>
            ))}
            {examples.map((example, index) => (
                <p key={index} className="text-gray-700 mt-4">
                    {example}
                </p>
            ))}
        </div>
    );
};

export default CompetenceMotivation;
