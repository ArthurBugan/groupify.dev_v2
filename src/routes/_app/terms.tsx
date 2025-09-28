import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/terms")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex m-10 items-center justify-center">
			<article className="typography">
				<h1>Terms of Service</h1>
				<p>Last updated: September 27, 2025</p>

				<p>Welcome to Groupify!</p>
				<p>
					These Terms of Service ("Terms", "Terms of Service") govern your use
					of our website located at{" "}
					<a href="https://groupify.dev" target="_blank" rel="noopener">
						https://groupify.dev
					</a>{" "}
					(together or individually "Service") operated by Groupify ("Company",
					"we", "our", or "us").
				</p>
				<p>
					By accessing and using our Service, you agree to be bound by these
					Terms. If you disagree with any part of the Terms, then you may not
					access the Service.
				</p>

				<h2>1. Acceptance of Terms</h2>
				<p>
					By accessing or using the Service, you confirm that you can form a
					binding contract with Groupify, and that you agree to comply with
					these Terms. If you are using the Service on behalf of an
					organization, you agree to these Terms for that organization and
					represent that you have the authority to bind it.
				</p>

				<h2>2. Use of the Service</h2>
				<p>
					You agree to use the Service only for lawful purposes and in
					accordance with these Terms. You must not:
				</p>
				<ul>
					<li>Violate any applicable laws or regulations.</li>
					<li>
						Use the Service to exploit, harm, or attempt to exploit or harm
						others.
					</li>
					<li>
						Engage in any activity that interferes with or disrupts the Service.
					</li>
					<li>
						Attempt to gain unauthorized access to any parts of the Service.
					</li>
				</ul>

				<h2>3. Accounts</h2>
				<p>
					When you create an account, you must provide information that is
					accurate, complete, and current. You are responsible for maintaining
					the confidentiality of your account and password and for restricting
					access to your device. You accept responsibility for all activities
					that occur under your account.
				</p>

				<h2>4. Intellectual Property</h2>
				<p>
					The Service and its original content, features, and functionality are
					and will remain the exclusive property of Groupify and its licensors.
					The Service is protected by copyright, trademark, and other laws.
				</p>

				<h2>5. User Content</h2>
				<p>
					You retain ownership of any content you submit, post, or display on or
					through the Service. By submitting content, you grant Groupify a
					non-exclusive, worldwide, royalty-free license to use, reproduce,
					modify, and display such content in connection with the Service.
				</p>

				<h2>6. Termination</h2>
				<p>
					We may suspend or terminate your account and access to the Service
					immediately, without prior notice or liability, for any reason
					whatsoever, including if you breach these Terms.
				</p>
				<p>
					Upon termination, your right to use the Service will immediately
					cease.
				</p>

				<h2>7. Limitation of Liability</h2>
				<p>
					To the fullest extent permitted by law, Groupify shall not be liable
					for any indirect, incidental, special, consequential or punitive
					damages, including without limitation, loss of profits, data, or
					goodwill.
				</p>

				<h2>8. Disclaimer</h2>
				<p>
					Your use of the Service is at your sole risk. The Service is provided
					on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind,
					either express or implied.
				</p>

				<h2>9. Governing Law</h2>
				<p>
					These Terms shall be governed and construed in accordance with the
					laws of Brazil, without regard to its conflict of law provisions.
				</p>

				<h2>10. Changes to These Terms</h2>
				<p>
					We reserve the right to modify or replace these Terms at any time. If
					a revision is material, we will provide at least 7 days’ notice before
					new terms take effect. Your continued use of the Service after the
					revisions come into effect constitutes your agreement to be bound by
					the revised terms.
				</p>

				<h2>11. Contact Us</h2>
				<p>If you have any questions about these Terms, you can contact us:</p>
				<ul>
					<li>
						By email: <a href="mailto:admin@groupify.dev">admin@groupify.dev</a>
					</li>
				</ul>
			</article>
		</div>
	);
}
