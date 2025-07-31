import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function LessonContent() {
  return (
    <div className="space-y-8 text-gray-300">
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white">
          What is Community Building?
        </h3>
        <p>
          Community building is the process of creating and nurturing a group of
          people who share common interests, goals, or values. In the digital
          age, communities can exist across various platforms and spaces,
          bringing together individuals from around the world.
        </p>
        <p>
          At its core, community building is about creating meaningful
          connections between people and fostering a sense of belonging. It's
          not just about gathering people in one place, but about creating an
          environment where members feel valued, heard, and engaged.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white">
          Key Elements of Successful Communities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gray-800 border-gray-700 p-4">
            <h4 className="font-medium text-white mb-2">Shared Purpose</h4>
            <p className="text-sm text-gray-300">
              Every successful community has a clear purpose that resonates with
              its members. This shared purpose creates alignment and gives
              members a reason to participate.
            </p>
          </Card>
          <Card className="bg-gray-800 border-gray-700 p-4">
            <h4 className="font-medium text-white mb-2">Sense of Belonging</h4>
            <p className="text-sm text-gray-300">
              Members need to feel like they belong and are valued within the
              community. This emotional connection keeps people engaged and
              invested.
            </p>
          </Card>
          <Card className="bg-gray-800 border-gray-700 p-4">
            <h4 className="font-medium text-white mb-2">Clear Guidelines</h4>
            <p className="text-sm text-gray-300">
              Well-defined community guidelines create a safe and respectful
              environment where members know what to expect and how to behave.
            </p>
          </Card>
          <Card className="bg-gray-800 border-gray-700 p-4">
            <h4 className="font-medium text-white mb-2">Active Engagement</h4>
            <p className="text-sm text-gray-300">
              Regular interaction and participation from members keeps the
              community alive and thriving. Engagement is the lifeblood of any
              community.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white">
          The Community Building Framework
        </h3>
        <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-800">
          <Image
            src="/placeholder.svg?height=400&width=800&text=Community+Building+Framework"
            alt="Community Building Framework"
            fill
            className="object-cover"
          />
        </div>
        <p>
          The framework above illustrates the cyclical nature of community
          building. It starts with establishing a purpose, followed by creating
          the right environment, fostering engagement, and continuously evolving
          based on feedback and changing needs.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white">Types of Communities</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-medium text-white">
              Interest-based communities:
            </span>{" "}
            Formed around shared hobbies, passions, or interests
          </li>
          <li>
            <span className="font-medium text-white">
              Practice-based communities:
            </span>{" "}
            Focused on professional development and skill-sharing
          </li>
          <li>
            <span className="font-medium text-white">
              Product-based communities:
            </span>{" "}
            Centered around specific products or services
          </li>
          <li>
            <span className="font-medium text-white">
              Geographic communities:
            </span>{" "}
            Connected by physical location or region
          </li>
          <li>
            <span className="font-medium text-white">
              Identity-based communities:
            </span>{" "}
            United by shared identities or life experiences
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white">
          Why Community Building Matters
        </h3>
        <p>
          In today's digital landscape, building a community is more important
          than ever. Communities provide:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>A sense of connection in an increasingly isolated world</li>
          <li>Valuable feedback and insights for creators and brands</li>
          <li>Support networks for personal and professional growth</li>
          <li>Opportunities for collaboration and innovation</li>
          <li>
            Sustainable engagement that goes beyond transactional relationships
          </li>
        </ul>
        <p>
          By the end of this course, you'll have the knowledge and tools to
          build and nurture your own thriving community.
        </p>
      </section>
    </div>
  );
}
