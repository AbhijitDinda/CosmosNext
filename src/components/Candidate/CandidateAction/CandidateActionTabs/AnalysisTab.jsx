import InsightsBarChart from '@/components/InsightsBarChart';
import { Box, Sparkles, Target, User2, Users } from 'lucide-react';
import React from 'react';

const profileOverview = {
    overallScore: "87%",
    ranking: "3rd out of 50 applicants",
    currentRole: "Software Engineer",
    experience: "5 years in full-stack development",
    education: "B.Sc. in Computer Science from XYZ University",
    certifications: [
        "AWS Certified Solutions Architect",
        "Google Professional Cloud Developer"
    ],
};

const matchOverview = [
    { skill: "JavaScript", level: "92% (Advanced)", match: "Matches the requirement" },
    { skill: "ReactJS", level: "88% (Advanced)", match: "Matches the requirement" },
    { skill: "Python", level: "85% (Intermediate)", match: "Meets but could improve" },
    { experience: "100%", match: "Matches the requirement" },
    { certifications: "100%", match: "Matches the preferred certification" },
    { education: "100%", match: "Matches the education requirement" },
];

const teamDynamics = {
    collaboration: "87%",
    communication: "87%",
    conflictResolution: "67%",
    flexibility: "57%",
    preferredRoles: [
        { role: "Leader", description: "Naturally gravitates towards leadership positions." },
        { role: "Collaborator", description: "Works well in collaborative settings." },
        { role: "Strategist", description: "Excels in roles requiring planning and problem-solving." }
    ],
    challenges: [
        { type: "Overassertiveness", description: "May dominate discussions." },
        { type: "Delegation", description: "Prefers taking key tasks rather than delegating." },
        { type: "Adaptability", description: "Struggles with rapidly shifting priorities." }
    ],
};

const aiInsights = {
    bestFit: "Full-Stack Development Roles, Technical Lead positions.",
    recommendation: "Consider Jane for leadership roles where her advanced technical skills and strong leadership potential can be leveraged.",
    notes: "Jane demonstrates a strong alignment with the technical requirements for the role. Leadership experience is a valuable asset, though there is room for growth in communication and Python proficiency."
};

const AnalysisTab = () => {
    return (
        <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Profile Overview */}
                <div className='space-y-4'>
                    <div className='flex bg-gray-100 p-2 items-center gap-2 rounded-sm'>
                        <div> <User2 /> </div>
                        <h3 className="font-semibold">Profile Overview</h3>
                    </div>
                    <div className='border border-Lines rounded-sm p-2 space-y-2'>
                        <h2 className='text-Secondary_Text font-medium text-xs md:text-sm'>Overall Suitability Score: <span className='text-black text-xs md:text-sm'>{profileOverview.overallScore}</span></h2>
                        <h2 className='text-Secondary_Text font-medium text-xs md:text-sm'>Ranking: <span className='text-black text-xs md:text-sm'>{profileOverview.ranking}</span></h2>
                    </div>
                    <div className='border border-Lines rounded-sm p-2 space-y-2'>
                        <h2 className='text-Secondary_Text font-medium text-xs md:text-sm'>Current Role: <span className='text-black text-xs md:text-sm'>{profileOverview.currentRole}</span></h2>
                        <h2 className='text-Secondary_Text font-medium text-xs md:text-sm'>Experience: <span className='text-black text-xs md:text-sm'>{profileOverview.experience}</span></h2>
                        <h2 className='text-Secondary_Text font-medium text-xs md:text-sm'>Education: <span className='text-black text-xs md:text-sm'>{profileOverview.education}</span>  </h2>
                        <h2 className='text-Secondary_Text font-medium text-xs md:text-sm'>Certifications: <span className='text-black text-xs md:text-sm'>{profileOverview.certifications.map((cert, idx) => (
                            <span key={idx}>{cert} &nbsp; &nbsp;</span>
                        ))}</span></h2>
                    </div>
                </div>

                {/*  Personality Insights Section */}
                <div className='space-y-4'>
                    <div className='flex bg-gray-100 p-2 items-center gap-2 rounded-sm'>
                        <div> <Box /> </div>
                        <h3 className="font-semibold">Personality Insights Section</h3>
                    </div>
                    <InsightsBarChart />
                </div>

                {/* Match Overview */}
                <div className='space-y-4'>
                    <div className='flex bg-gray-100 p-2 items-center gap-2 rounded-sm'>
                        <div> <Target /> </div>
                        <h3 className="font-semibold">Match Overview</h3>
                    </div>
                    <div className='border border-Lines rounded-sm p-2 space-y-2'>
                        <h2 className='text-Secondary_Text font-medium text-xs md:text-sm'>Skills Match:</h2>
                        <div className='space-y-2'>
                            {matchOverview.filter(item => item.skill).map((item, idx) => (
                                <h2 key={idx} className='text-Secondary_Text font-medium text-xs md:text-sm'>
                                    {item.skill}: <span className={`text-${item.level.includes('Advanced') ? 'green' : 'amber'}-600 text-xs md:text-sm`}>{item.level} - {item.match}</span>
                                </h2>
                            ))}
                        </div>
                    </div>
                    <div className='border border-Lines rounded-sm p-2 space-y-2'>
                        <h2 className='text-Secondary_Text font-medium text-xs md:text-sm'>Experience Match:</h2>
                        <div className='space-y-2'>
                            {matchOverview.filter(item => item.experience).map((item, idx) => (
                                <h2 key={idx} className='text-Secondary_Text font-medium text-xs md:text-sm'>
                                    Experience: <span className='text-black text-xs md:text-sm'>{item.experience} - {item.match}</span>
                                </h2>
                            ))}
                        </div>
                    </div>
                    <div className='border border-Lines rounded-sm p-2 space-y-2'>
                        <h2 className='text-Secondary_Text font-medium text-xs md:text-sm'>Certifications Match:</h2>
                        <div className='space-y-2'>
                            {matchOverview.filter(item => item.certifications).map((item, idx) => (
                                <h2 key={idx} className='text-Secondary_Text font-medium text-xs md:text-sm'>
                                    Certifications: <span className='text-black text-xs md:text-sm'>{item.certifications} - {item.match}</span>
                                </h2>
                            ))}
                        </div>
                    </div>
                    <div className='border border-Lines rounded-sm p-2 space-y-2'>
                        <h2 className='text-Secondary_Text font-medium text-xs md:text-sm'>Education Match:</h2>
                        <div className='space-y-2'>
                            {matchOverview.filter(item => item.education).map((item, idx) => (
                                <h2 key={idx} className='text-Secondary_Text font-medium text-xs md:text-sm'>
                                    Education: <span className='text-black text-xs md:text-sm'>{item.education} - {item.match}</span>
                                </h2>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Dynamics Overview */}
                <div className='space-y-4'>
                    <div className='flex bg-gray-100 p-2 items-center gap-2 rounded-sm'>
                        <div> <Users /> </div>
                        <h3 className="font-semibold">Team Dynamics</h3>
                    </div>
                    <div className='border border-Lines rounded-sm p-2 space-y-2'>
                        <p className='text-Secondary_Text font-medium text-xs md:text-sm'>Collaboration: <span className='text-Primary text-xs md:text-sm'>{teamDynamics.collaboration}</span></p>
                        <p className='text-Secondary_Text font-medium text-xs md:text-sm'>Communication: <span className='text-Primary text-xs md:text-sm'>{teamDynamics.communication}</span></p>
                        <p className='text-Secondary_Text font-medium text-xs md:text-sm'>Conflict Resolution: <span className='text-Primary text-xs md:text-sm'>{teamDynamics.conflictResolution}</span></p>
                        <p className='text-Secondary_Text font-medium text-xs md:text-sm'>Flexibility: <span className='text-Primary text-xs md:text-sm'>{teamDynamics.flexibility}</span></p>
                    </div>
                    <div className='border border-Lines rounded-sm p-2 space-y-2'>
                        <h4 className="font-semibold">Preferred Roles</h4>
                        <ul className='space-y-1'>
                            {teamDynamics.preferredRoles.map((role, idx) => (
                                <h2 key={idx} className='text-Secondary_Text font-medium text-xs md:text-sm'>
                                    <span className='font-semibold text-xs md:text-sm'>{role.role}: </span>
                                    <span className='text-black text-xs md:text-sm'>{role.description}</span>
                                </h2>
                            ))}
                        </ul>
                    </div>
                    <div className='border border-Lines rounded-sm p-2 space-y-2'>
                        <h4 className=" text-xs md:text-sm text-Error font-semibold">Potential Challenges</h4>

                        {teamDynamics.challenges.map((challenge, idx) => (
                            <h2 key={idx} className='text-Secondary_Text font-medium text-xs md:text-sm'>
                                <span className='font-semibold text-xs md:text-sm'>{challenge.type}: </span>
                                <span className='text-black text-xs md:text-sm'>{challenge.description}</span>
                            </h2>
                        ))}

                    </div>
                </div>
            </div>

            {/* AI Insights */}
            <div className='space-y-4'>
                <div className='flex bg-gray-100 p-2 items-center gap-2 rounded-sm'>
                    <div> <Sparkles /> </div>
                    <h3 className="font-semibold">AI Insights</h3>
                </div>
                <div className='border border-Lines rounded-sm p-2 space-y-2'>
                    <span className='text-Primary font-medium text-xs md:text-sm'>Best Fit: </span>
                    <span className='text-black text-xs md:text-sm font-semibold'>{aiInsights.bestFit}</span>
                </div>
                <div className='border border-Lines rounded-sm p-2 space-y-2'>
                    <span className='text-Primary font-medium text-xs md:text-sm'>Recommendation: </span>
                    <span className='text-black text-xs md:text-sm font-semibold'>{aiInsights.recommendation}</span>
                </div>
                <div className='border border-Lines rounded-sm p-2 space-y-2'>
                    <span className='text-Secondary_Text font-medium text-xs md:text-sm'>Notes: </span>
                    <span className='text-black text-xs md:text-sm font-semibold'>{aiInsights.notes}</span>
                </div>
            </div>

        </section>
    );
};

export default AnalysisTab;
