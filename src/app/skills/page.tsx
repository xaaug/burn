// app/skills/page.tsx
"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";

const SKILLS = [
    "Cooking basic meals",
    "Boiling water safely",
    "Making tea / coffee",
    "Grocery shopping & reading labels",
    "Budgeting for daily expenses",
    "Paying bills on time",
    "Using a bank account / ATM",
    "Sending/receiving money (Mpesa, bank transfer)",
    "Understanding interest & loans",
    "Saving money regularly",
    "Understanding rent & lease agreements",
    "Cleaning your home efficiently",
    "Doing laundry properly",
    "Ironing clothes",
    "Folding clothes neatly",
    "Basic sewing (buttons, hems)",
    "Taking out trash responsibly",
    "Keeping your space organized",
    "Basic hygiene (showering, teeth brushing)",
    "Nail care",
    "Skincare basics",
    "Haircare basics",
    "Oral hygiene",
    "Handwashing & disinfecting",
    "First aid (bandages, cuts, burns)",
    "CPR / emergency response basics",
    "Handling minor injuries",
    "Using a fire extinguisher",
    "Home safety (locks, alarms)",
    "Personal safety in public",
    "Avoiding scams / fraud",
    "Road safety",
    "Crossing streets safely",
    "Using public transport",
    "Reading maps / navigation",
    "Using GPS / smartphone for directions",
    "Asking for directions politely",
    "Waking up on time",
    "Planning a day effectively",
    "Making lists / tracking tasks",
    "Prioritizing important tasks",
    "Setting reminders / alarms",
    "Paying for transportation efficiently",
    "Filling fuel / handling vehicles safely",
    "Basic car maintenance (checking oil, tires)",
    "Booking appointments (doctor, vet, etc.)",
    "Understanding medical prescriptions",
    "Using a menu / ordering at restaurants",
    "Food hygiene & storage",
    "Reading expiration dates",
    "Cooking for dietary needs",
    "Planning and hosting small gatherings",
    "Cleaning up after events",
    "Handling groceries / storage",
    "Packing efficiently for trips",
    "Travel planning",
    "Navigation without GPS",
    "Planning a budget-friendly trip",
    "Using a calendar app effectively",
    "Setting recurring reminders",
    "Simple DIY home repairs",
    "Fixing a leaky tap",
    "Changing a light bulb safely",
    "Using basic tools (hammer, screwdriver)",
    "Fixing a minor electrical problem",
    "Plumbing basics (unclogging drains)",
    "Handling household emergencies",
    "Recycling & waste management",
    "Storing food properly",
    "Using kitchen knives safely",
    "Using cutlery properly (fork, knife, spoon)",
    "Using chopsticks efficiently",
    "Taking clear photographs",
    "Taking good videos",
    "Basic video editing",
    "Basic photo editing",
    "Operating a smartphone camera manually",
    "Understanding camera angles & lighting",
    "Filming short clips for social media",
    "Creating basic slideshows or compilations",
    "Using a tripod / stabilizer",
    "Using a selfie stick effectively",
    "Framing shots like a pro",
    "Understanding composition (rule of thirds)",
    "Cropping & basic image corrections",
    "Using filters subtly",
    "Maintaining digital files",
    "Backing up important documents",
    "Printing & scanning documents",
    "Typing efficiently / keyboard shortcuts",
    "Using Google Docs / Word efficiently",
    "Spreadsheet basics (Excel / Google Sheets)",
    "Making charts & graphs",
    "Using calculator & mental math efficiently",
    "Understanding basic percentages / interest",
    "Making simple investments",
    "Understanding stock basics",
    "Understanding crypto basics",
    "Tracking expenses manually",
    "Tracking expenses digitally",
    "Discipline (doing what’s needed even when lazy)",
    "Delayed gratification",
    "Self-control under temptation",
    "Emotional regulation under stress",
    "Patience in difficult situations",
    "Handling failure gracefully",
    "Learning from mistakes quickly",
    "Mental toughness under discomfort",
    "Adaptability in new environments",
    "Critical thinking & questioning assumptions",
    "Strategic thinking",
    "Decision-making under uncertainty",
    "Problem-solving in chaos",
    "Planning for long-term vs short-term gains",
    "Stoicism principles (focus on controllables)",
    "Mindfulness / meditation",
    "Breath control techniques",
    "Journaling for self-reflection",
    "Self-assessment regularly",
    "Visualization for goals",
    "Setting SMART goals",
    "Tracking progress effectively",
    "Reframing negative thoughts",
    "Recognizing cognitive biases",
    "Practicing gratitude",
    "Controlling impulses",
    "Managing stress proactively",
    "Practicing emotional independence",
    "Avoiding overthinking paralysis",
    "Resilience under social pressure",
    "Resourcefulness (making do with what’s available)",
    "Turning setbacks into growth opportunities",
    "Observing personal triggers",
    "Understanding and managing your ego",
    "Handling criticism gracefully",
    "Accepting feedback without defensiveness",
    "Developing curiosity",
    "Learning to focus for long periods",
    "Avoiding procrastination traps",
    "Prioritizing high-value tasks",
    "Reading the room instantly",
    "Spotting key people in groups",
    "Making instant small talk",
    "Remembering names quickly",
    "Giving genuine compliments",
    "Storytelling that grabs attention",
    "Making people laugh naturally",
    "Timing humor perfectly",
    "Handling awkward silences",
    "Leading group conversations subtly",
    "Adding value to conversations",
    "Listening actively",
    "Asking questions that spark stories",
    "Exiting a conversation smoothly",
    "Introducing people to each other",
    "Creating inside jokes",
    "Dancing confidently",
    "Singing along socially",
    "Spotting vibe killers & avoiding them",
    "Encouraging shy people to join in",
    "Subtle flirting skills",
    "Reading flirting cues accurately",
    "Making people feel comfortable instantly",
    "Using body language that signals openness",
    "Maintaining eye contact naturally",
    "Smiling without being fake",
    "Knowing when to be the center of attention",
    "Knowing when to fade into background",
    "Hosting games or activities",
    "Mastering a party trick",
    "Mixing drinks / simple cocktails",
    "Managing alcohol intake strategically",
    "Reading intoxication levels in others",
    "Telling short, memorable stories",
    "Sharing experiences without bragging",
    "Using humor to defuse tension",
    "Being the hype person when needed",
    "Making memorable exits",
    "Initiating group photos",
    "Handling teasing gracefully",
    "Using pop culture references smoothly",
    "Coordinating group energy without dominating",
    "Encouraging others’ stories",
    "Maintaining composure under embarrassment",
    "Flattering conversations (boosting ego subtly)",
    "Leading by example",
    "Delegation effectively",
    "Mentorship skills",
    "Inspiring others",
    "Persuasion & influence",
    "Negotiating for value",
    "Public speaking with confidence",
    "Giving constructive feedback",
    "Handling conflict calmly",
    "Handling rejection gracefully",
    "Networking strategically",
    "Asking powerful questions",
    "Making people feel valued",
    "Encouraging teamwork",
    "Managing group dynamics",
    "Setting boundaries assertively",
    "Coaching others to improve",
    "Negotiating salaries / raises",
    "Pitching ideas convincingly",
    "Decision-making in groups",
    "Bodyweight strength exercises (push-ups, squats)",
    "Pull-ups / chin-ups",
    "Balance & coordination exercises",
    "Core strengthening",
    "Cardio endurance",
    "Flexibility / stretching routines",
    "Yoga or mobility practice",
    "Martial arts or self-defense basics",
    "Situational awareness",
    "Breath control under stress",
    "Cold exposure tolerance",
    "Fire-building & basic survival",
    "Shelter-building in outdoors",
    "Navigating without GPS",
    "Identifying edible plants",
    "Tracking weather / natural cues",
    "Basic first aid in survival situations",
    "Fishing / catching food basics",
    "Knots for survival & everyday use",
    "Handling knives safely",
    "Using ropes / cords effectively",
    "Swimming",
    "Swimming with minimal fatigue",
    "Rescue techniques in water",
    "Hiking efficiently",
    "Climbing safely (ropes optional)",
    "Cycling for fitness / transport",
    "Running efficiently",
    "Jump rope endurance",
    "Skipping / coordination drills",
    "Breath-holding exercises",
    "Carrying objects efficiently",
    "Basic stretching routines",
    "Sketching / drawing",
    "Painting / shading",
    "Digital art basics",
    "Graphic design basics",
    "Photography composition",
    "Video filming",
    "Video editing",
    "Audio editing",
    "Storyboarding",
    "Writing stories / scripts",
    "Copywriting basics",
    "Blogging / content creation",
    "Creating memes / social content",
    "Crafting DIY projects",
    "Simple carpentry",
    "Basic electronics / Arduino",
    "Simple sewing projects",
    "Home decor basics",
    "Organizing space aesthetically",
    "Cooking visually appealing meals",
    "Flower arrangement / simple gardening",
    "Music instrument basics",
    "Singing confidently",
    "Dancing rhythmically",
    "Playing rhythm games for coordination",
    "Making small gifts / crafts",
    "Using tools safely",
    "Speed reading",
    "Retention techniques",
    "Memory palace / mnemonics",
    "Problem-solving puzzles",
    "Critical thinking exercises",
    "Mental math",
    "Logic games",
    "Pattern recognition",
    "Recognizing biases",
    "Analytical reasoning",
    "Research & fact-checking",
    "Synthesizing information quickly",
    "Extracting actionable insights",
    "Learning quickly under pressure",
    "Planning multi-step strategies",
    "Scenario visualization",
    "Mental rehearsal for challenges",
    "Evaluating options critically",
    "Risk assessment basics",
    "Decision-making frameworks",
    "Emotional self-awareness",
    "Empathy without weakness",
    "Social cue recognition",
    "Reading body language",
    "Detecting deception",
    "Conflict resolution",
    "Handling jealousy & envy internally",
    "Handling social pressure",
    "Assertiveness",
    "Negotiation in relationships",
    "Apologizing sincerely",
    "Complimenting effectively",
    "Sharing stories that inspire",
    "Encouraging others genuinely",
    "Maintaining composure under provocation",
    "Small talk mastery",
    "Deep conversation skills",
    "Asking powerful questions",
    "Humor timing & delivery",
    "Storytelling with suspense & punchlines",
    "Flirting subtly & confidently",
    "Social charm & presence",
    "Calming others in tense situations",
    "Encouraging teamwork socially",
    "Leadership in informal groups",
    "Negotiating group decisions",
    "Reading room energy",
    "Task prioritization",
    "Time-blocking",
    "Pomodoro / focus techniques",
    "Autonomy & self-management",
    "Taking initiative",
    "Follow-through on commitments",
    "Digital organization (folders, files)",
    "Note-taking effectively",
    "Mind mapping ideas",
    "Extracting key info from books/videos",
    "Researching effectively",
    "Productivity analytics",
    "Reviewing & improving workflows",
    "Networking for career opportunities",
    "Pitching ideas professionally",
    "Interview skills",
    "Resume writing",
    "Cover letter writing",
    "Freelancing basics",
    "Job application strategy",
    "Professional email etiquette",
    "Using professional apps efficiently",
    "Calendar management",
    "Scheduling meetings",
    "Team collaboration online",
    "Negotiating prices in markets",
    "Haggling politely",
    "Buying second-hand items safely",
    "Estimating distances",
    "Estimating weight / volume visually",
    "Tracking time without clock",
    "Reading graphs & charts",
    "Using public services efficiently",
    "Understanding local laws basics",
    "Voting / civic engagement",
    "Understanding taxes basics",
    "Tracking personal achievements",
    "Making presentations",
    "Using whiteboards / markers",
    "Taking group notes",
    "Handling peer pressure",
    "Minimizing distractions",
    "Energy management daily",
    "Self-care routines",
    "Observing subtle patterns",
    "Spotting opportunities",
    "Learning quickly from mistakes",
    "Asking for help effectively",
    "Mentoring peers",
    "Handling emergencies calmly",
    "Simple firefighting awareness",
    "Dealing with rude people",
    "Handling aggressive drivers",
    "Public etiquette",
    "Social media safety",
    "Using apps for productivity",
    "Using apps for finance",
    "Using apps for learning",
    "Quick internet research",
    "Using maps efficiently",
    "Asking locals for insights",
    "Reading weather cues",
    "Planning outdoor activities",
    "Cooking outdoors",
    "Camping basics",
    "Hiking safely",
    "Maintaining gear / equipment",
    "Traveling light",
    "Packing efficiently",
    "Travel safety awareness",
    "Airport / station navigation",
    "Planning emergency exits",
    "Using survival tools",
    "Handling minor accidents",
    "Reporting emergencies",
    "Understanding first responders’ protocols",
    "Understanding insurance basics",
    "Renting safely",
    "Understanding contracts",
    "Making legal copies / IDs",
    "Handling lost items efficiently",
    "Maintaining documents digitally",
    "Password management",
    "Digital privacy awareness",
    "File recovery basics",
    "Dressing with purpose",
    "Wearing appropriate shoes",
    "Matching clothes subtly",
    "Accessorizing confidently",
    "Using fragrance / perfume effectively",
    "Grooming routines daily",
    "Table manners",
    "Dining etiquette internationally",
    "Restaurant ordering efficiently",
    "Wine / drink basics",
    "Coffee / tea etiquette",
    "Hosting guests confidently",
    "Housewarming / party etiquette",
    "Gift-giving tastefully",
    "Thank-you etiquette",
    "Complimenting hosts",
    "Coordinating group photos",
    "Playing board/card games socially",
    "Social games etiquette",
    "Reading trends & social cues",
    "Music appreciation",
    "Reading lyrics for meaning",
    "Dancing socially",
    "Singing socially",
    "Karaoke confidently",
    "Appreciating art & exhibitions",
    "Appreciating cultural differences",
    "Engaging in casual debates respectfully",
    "Humor & joke timing",
    "Conversation starters",
    "Social storytelling",
    "Making people feel seen",
    "Encouraging others’ talents",
    "Supporting friends socially",
    "Handling criticism socially",
    "Celebrating others’ wins",
    "Building social trust",
    "Being approachable",
    "Small gestures of kindness",
    "Being punctual",
    "Being reliable socially",
    "Hosting casual events",
    "Organizing group activities",
    "Public speaking mastery",
    "Negotiation mastery",
    "Leadership mastery",
    "Personal branding",
    "Social influence",
    "Emotional intelligence mastery",
    "Networking mastery",
    "Learning mastery",
    "Focus mastery",
    "Self-discipline mastery",
    "Self-reliance mastery",
    "Self-awareness mastery",
    "Critical thinking mastery",
    "Persuasion mastery",
    "Confidence mastery",
    "Presence & charisma mastery",
    "Style & grooming mastery",
    "Social adaptability",
    "Conflict management mastery",
    "Stress resilience",
    "Creativity mastery",
    "Mental performance (memory, recall)",
    "Speed learning",
    "Public perception management",
    "Storytelling mastery",
    "Humor mastery",
    "Influence in small groups",
    "Influence in large groups",
    "Group dynamics mastery",
    "Strategic thinking mastery",
    "Time leverage mastery",
    "Risk assessment mastery",
    "Energy management mastery",
    "Health & fitness mastery",
    "Personal safety mastery",
    "Survival mastery",
    "Emergency management mastery",
    "Travel mastery",
    "Cooking mastery",
    "Photography / videography mastery",
    "Music mastery",
    "Art appreciation mastery",
    "DIY mastery",
    "Digital literacy mastery",
    "Financial independence mastery",
    "Investment literacy mastery",
    "Negotiating deals mastery",
    "Freelancing / side hustle mastery",
    "Career growth mastery",
    "Productivity mastery",
    "Focus under pressure mastery",
    "Decision-making mastery",
    "Adaptability under change mastery",
    "Resilience mastery",
    "Legacy & influence building"
  ];
  

interface SkillData {
  completed: boolean;
  notes: string;
  firstCompleted?: boolean;
}

type SkillsRecord = Record<string, SkillData>;

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillsRecord>({});
  const [activeTab, setActiveTab] = useState<"incomplete" | "completed">("incomplete");

  useEffect(() => {
    const saved = localStorage.getItem("skillsData");
    if (saved) {
      setSkills(JSON.parse(saved) as SkillsRecord);
    } else {
      const initial: SkillsRecord = {};
      SKILLS.forEach((skill) => {
        initial[skill] = { completed: false, notes: "" };
      });
      setSkills(initial);
    }
  }, []);

  const saveSkills = (updated: SkillsRecord) => {
    localStorage.setItem("skillsData", JSON.stringify(updated));
  };

  const handleCheckboxChange = (skill: string) => {
    setSkills((prev) => {
      const isFirstTime = !prev[skill].completed;
      const updated: SkillsRecord = {
        ...prev,
        [skill]: {
          ...prev[skill],
          completed: !prev[skill].completed,
          firstCompleted: isFirstTime ? true : prev[skill].firstCompleted,
        },
      };
      saveSkills(updated);
      return updated;
    });
  };

  const handleNotesChange = (skill: string, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSkills((prev) => {
      const updated: SkillsRecord = {
        ...prev,
        [skill]: { ...prev[skill], notes: value },
      };
      saveSkills(updated);
      return updated;
    });
  };

  const handleSaveSkill = (skill: string) => {
    setSkills((prev) => {
      const updated: SkillsRecord = {
        ...prev,
        [skill]: { ...prev[skill], firstCompleted: false },
      };
      saveSkills(updated);
      return updated;
    });
    setActiveTab("completed");
  };

  const incompleteSkills = SKILLS.filter((skill) => !skills[skill]?.completed);
  const completedSkills = SKILLS.filter((skill) => skills[skill]?.completed);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex min-h-screen font-mono">
      {/* Left image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/skills-left-image.jpg')" }}
      ></div>

      {/* Right skills dashboard */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Skill Dashboard</h1>
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "incomplete" | "completed")}>
          <TabsList className="mb-4">
            <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {/* Incomplete Skills */}
          <TabsContent value="incomplete">
            {incompleteSkills.length === 0 ? (
              <Empty>
                <EmptyTitle>No incomplete skills!</EmptyTitle>
                <EmptyDescription>All skills are completed 🎉</EmptyDescription>
              </Empty>
            ) : (
              <div className="grid gap-4">
                <AnimatePresence>
                  {incompleteSkills.map((skill) => {
                    const skillData = skills[skill];
                    return (
                      <motion.div
                        key={skill}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                      >
                        <Card className="p-4 hover:shadow-lg transition-shadow duration-200">
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              <span>{skill}</span>
                              <Checkbox
                                checked={skillData?.completed || false}
                                onCheckedChange={() => handleCheckboxChange(skill)}
                              />
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {!skillData?.completed && (
                              <div className="mt-2 text-gray-500 text-sm">
                                Click checkbox when completed.
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>

          {/* Completed Skills */}
          <TabsContent value="completed">
            {completedSkills.length === 0 ? (
              <Empty>
                <EmptyTitle>No completed skills yet</EmptyTitle>
                <EmptyDescription>Check off a skill to mark it completed ✅</EmptyDescription>
              </Empty>
            ) : (
              <div className="grid gap-4">
                <AnimatePresence>
                  {completedSkills.map((skill) => {
                    const skillData = skills[skill];
                    return (
                      <motion.div
                        key={skill}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                      >
                        <Card className="p-4 hover:shadow-lg transition-shadow duration-200">
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              <span>{skill}</span>
                              <Checkbox
                                checked={skillData?.completed || false}
                                onCheckedChange={() => handleCheckboxChange(skill)}
                              />
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {skillData?.firstCompleted ? (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <p className="mb-2 text-sm text-gray-700">
                                  First time completed! How did you do it? ✍️
                                </p>
                                <Input
                                  placeholder="Write how you did it..."
                                  value={skillData.notes}
                                  onChange={(e) => handleNotesChange(skill, e)}
                                />
                                <Button className="mt-2" onClick={() => handleSaveSkill(skill)}>
                                  Save
                                </Button>
                              </motion.div>
                            ) : (
                              <div className="mt-2 text-gray-500 text-sm">
                                Notes saved: {skillData?.notes || "No notes"}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
