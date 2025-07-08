import Image from 'next/image';

const teamMembers = [
  { name: 'John Snow', role: 'CEO', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Stark', role: 'CTO', img: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { name: 'Robert', role: 'CMO', img: 'https://randomuser.me/api/portraits/men/34.jpg' },
  { name: 'Sansa', role: 'Co-Founder', img: 'https://randomuser.me/api/portraits/women/35.jpg' },
  { name: 'Joffery', role: 'Founding Engineer', img: 'https://randomuser.me/api/portraits/men/36.jpg' },
  { name: 'Arya', role: 'Founding Engineer', img: 'https://randomuser.me/api/portraits/women/37.jpg' },
];

export default function About() {
  return (
    <>
      {/* About Section */}
      <section className="flex w-full justify-center items-center p-4 flex-wrap min-h-[90vh]">
        <div className="flex flex-col justify-center items-start min-w-[300px] lg:w-1/2">
          <span className="text-red-400 tracking-[0.2em] text-base">A BIT</span>
          <h2 className="my-2 text-5xl font-normal">ABOUT US</h2>
          <p className="text-gray-500 text-[0.95rem] max-w-[400px]">
            From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly was household applauded incommode. Why kept very ever home men. Considered sympathize ten uncommonly occasional assistance sufficient not.
          </p>
        </div>
        <div className="lg:w-1/2 flex flex-col items-end gap-4 min-w-[300px]">
          <Image 
            src="/pigeons_on_branch.png" 
            alt="Pigeon" 
            width={220} 
            height={200}
            className="rounded-xl mb-2" 
          />
          <Image 
            src="/pigeon_flying.png" 
            alt="Location" 
            width={220} 
            height={200}
            className="rounded-xl mb-2" 
          />
          <div className="relative w-[140px] mt-2">
            <Image 
              src="/logo.png" 
              alt="Banner" 
              width={140}
              height={100}
              className="w-full rounded-[18px]" 
            />
            <div className="absolute bottom-2.5 right-2.5 bg-sky-400 text-white rounded-xl py-1.5 px-4 font-semibold text-lg text-center">
              10+<br />Places
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-slate-800 text-white rounded-t-[2rem] mt-8 min-h-[80vh] py-8">
        <div className="text-center mb-2 text-5xl font-normal">Our Team</div>
        <div className="text-center text-base mb-8">
          Explore Our Success Stories and Innovative Projects
        </div>
        <div className="flex justify-center items-start gap-8 flex-wrap px-4">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center w-[120px] mx-8">
              {idx % 2 === 0 ? (
                <>
                  <Image 
                    src={member.img} 
                    alt={member.name} 
                    width={120}
                    height={300}
                    className="w-[10vw] h-[50vh] rounded-full object-cover border-4 border-white my-2 bg-gray-200 min-w-[80px] min-h-[200px]" 
                  />
                  <div className="font-medium text-[15px]">{member.name}</div>
                  <div className="text-[13px] text-teal-200">{member.role}</div>
                </>
              ) : (
                <>
                  <div className="font-medium text-[15px] order-2">{member.name}</div>
                  <div className="text-[13px] text-teal-200 order-3">{member.role}</div>
                  <Image 
                    src={member.img} 
                    alt={member.name} 
                    width={120}
                    height={300}
                    className="w-[10vw] h-[50vh] rounded-full object-cover border-4 border-white my-2 bg-gray-200 order-1 min-w-[80px] min-h-[200px]" 
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="flex w-full justify-center items-center p-4 flex-wrap min-h-[90vh]">
        {/* Mission */}
        <div className="flex flex-col justify-center items-start min-w-[300px] lg:w-1/2">
          <span className="text-red-400 tracking-[0.2em] text-base">A BIT</span>
          <h2 className="my-2 text-5xl font-normal">Mission</h2>
          <p className="text-gray-500 text-[0.95rem] max-w-[400px]">
            From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly was household applauded incommode. Why kept very ever home men. Considered sympathize ten uncommonly occasional assistance sufficient not.
          </p>
          <Image 
            src="/logo.png" 
            alt="Mission" 
            width={400}
            height={200}
            className="w-full rounded-xl my-4" 
          />
        </div>
        {/* Vision */}
        <div className="flex flex-col items-start gap-4 min-w-[300px] lg:w-1/2 lg:pl-40">
          <Image 
            src="/logo.png" 
            alt="Vision" 
            width={400}
            height={200}
            className="w-full rounded-xl my-4" 
          />
          <h2 className="text-5xl font-normal">Vision</h2>
          <p className="text-gray-500 text-[0.95rem] max-w-[400px]">
            From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly was household applauded incommode. Why kept very ever home men. Considered sympathize ten uncommonly occasional assistance sufficient not.
          </p>
        </div>
      </section>
    </>
  );
}
