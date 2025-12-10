# SecureFlow - Decentralized Escrow & Freelance Marketplace

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.19-blue)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Celo](https://img.shields.io/badge/Built%20on-Celo-35D07F)](https://celo.org/)

> **Production-Ready** decentralized escrow platform with identity verification and multi-token support

## 🚀 Overview

SecureFlow is a comprehensive decentralized platform combining escrow services with a freelance marketplace, built on Celo blockchain. Features gasless transactions through MetaMask Smart Accounts, multi-arbiter dispute resolution, reputation systems, identity verification via Self Protocol, and support for multiple payment tokens including GoodDollar (G$).

**Live Contract**: [`0x067FDA1ED957BB352679cbc840Ce6329E470fd07`](https://celoscan.io/address/0x067FDA1ED957BB352679cbc840Ce6329E470fd07) on Celo Mainnet

## ✨ Key Features

### 🏗️ Core Platform

- **Hybrid Escrow + Marketplace**: Direct hires and open job applications
- **Gasless Transactions**: MetaMask Smart Account integration for zero-fee transactions
- **Multi-Arbiter Consensus**: 1-5 arbiters with quorum-based voting
- **Reputation System**: Anti-gaming reputation tracking with NFT badges
- **Multi-Token Support**: Native CELO, cUSD, and GoodDollar (G$) payments

### 🔐 Identity & Security

- **Self Protocol Integration**: Privacy-first identity verification using zero-knowledge proofs
  - Sybil attack prevention
  - Age verification (18+)
  - Humanity checks
  - On-chain verification tracking
- **Smart Account Integration**: Delegated execution for gasless transactions
- **Reentrancy Protection**: All external functions protected
- **Emergency Controls**: Admin pause and refund mechanisms

### 🎯 Advanced Features

- **Milestone Management**: Submit, approve, reject, dispute milestones with feedback
- **Job Applications**: Freelancers apply to open jobs with pagination
- **Dispute Resolution**: Time-limited dispute windows with arbiter consensus
- **Real-time Notifications**: In-app notification system
- **Rating System**: Comprehensive freelancer rating with anti-gaming protection
- **GoodWallet Integration**: Support for GoodDollar UBI payments

### 💰 Payment Tokens

- **CELO**: Native blockchain currency
- **cUSD**: Celo Dollar stablecoin (whitelisted)
- **GoodDollar (G$)**: Universal Basic Income token (whitelisted)
  - Address: `0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A`
  - Claim daily G$ UBI via GoodWallet
  - Use G$ for all SecureFlow payments

## 📁 Project Structure

```
secureflow-celo/
├── contracts/
│   ├── SecureFlow.sol          # Main escrow & marketplace contract
│   ├── modules/                # Modular contract components
│   │   ├── EscrowCore.sol
│   │   ├── Marketplace.sol
│   │   ├── RatingSystem.sol
│   │   └── ...
│   └── interfaces/
│       └── ISecureFlow.sol
├── frontend/                   # Next.js 15 application
│   ├── app/                    # App router pages
│   ├── components/             # UI components
│   │   ├── gooddollar/        # GoodDollar integration
│   │   ├── self/              # Self Protocol components
│   │   └── ...
│   ├── contexts/              # React contexts
│   ├── hooks/                 # Custom hooks
│   └── lib/                   # Utilities and configs
├── scripts/
│   ├── deploy.js              # Contract deployment
│   ├── whitelist-gooddollar.js
│   ├── verify-gooddollar.js
│   └── ...
├── deployed.json              # Deployment information
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >=22 <23 (required for Self Protocol)
- **MetaMask** or compatible wallet
- **Celo mainnet** access (for production) or Alfajores testnet (for testing)

### Installation

1. **Clone and install dependencies**

```bash
git clone <repository-url>
cd secureflow-celo
npm install
cd frontend
npm install
```

2. **Environment setup**

Create `.env` in root:
```env
CELO_RPC_URL=https://forno.celo.org
CELO_TESTNET_RPC_URL=https://alfajores-forno.celo-testnet.org
PRIVATE_KEY=your_private_key_here
CELOSCAN_API_KEY=your_celoscan_api_key
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_SECUREFLOW_ESCROW=0x067FDA1ED957BB352679cbc840Ce6329E470fd07
NEXT_PUBLIC_CUSD_ADDRESS=0x765DE816845861e75A25fCA122bb6898B8B1282a
NEXT_PUBLIC_REOWN_ID=your_reown_project_id
NEXT_PUBLIC_CELO_RPC_URL=https://forno.celo.org
```

3. **Start development server**

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000`

## 📦 Contract Deployment

### Deploy to Celo Mainnet

```bash
# Deploy SecureFlow contract
npx hardhat run scripts/deploy.js --network celo

# Whitelist GoodDollar token
npx hardhat run scripts/whitelist-gooddollar.js --network celo

# Verify contracts on Celoscan
npx hardhat run scripts/verify-contracts.js --network celo
```

### Verify Token

```bash
# Verify GoodDollar token details
node scripts/verify-gooddollar.js
```

## 🔧 Configuration

### Supported Networks

- **Celo Mainnet** (Chain ID: 42220)
  - RPC: `https://forno.celo.org`
  - Explorer: https://celoscan.io
- **Celo Alfajores Testnet** (Chain ID: 44787)
  - RPC: `https://alfajores-forno.celo-testnet.org`
  - Explorer: https://alfajores.celoscan.io

### Whitelisted Tokens

- **CELO**: Native token (always supported)
- **cUSD**: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
- **GoodDollar (G$)**: `0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A`

### Adding New Tokens

Admin can whitelist additional ERC20 tokens via:
- Admin dashboard (`/admin`)
- Or deployment script: `scripts/whitelist-token.js`

## 🎨 Features in Detail

### Self Protocol Integration

SecureFlow integrates with Self Protocol for identity verification:

- **Privacy-First**: Zero-knowledge proofs ensure no personal data is stored
- **Sybil Prevention**: One verified identity per user
- **Age Verification**: Ensures users are 18+
- **On-Chain Tracking**: Verification status stored in smart contract

**Verification Flow:**
1. User connects wallet
2. Click "Verify Identity" button
3. Scan QR code with Self mobile app
4. Complete verification
5. Status updated on-chain

**Note**: Self Protocol requires HTTPS and doesn't work on localhost. Use ngrok or deploy to Vercel for testing.

### GoodDollar Integration

SecureFlow supports GoodDollar (G$) payments:

- **UBI Payments**: Users can receive payments in G$ tokens
- **GoodWallet Support**: Claim daily G$ and use for payments
- **Balance Display**: View G$ balance in dashboard
- **Seamless Integration**: Works with all existing escrow features

**Get G$ Tokens:**
1. Install GoodWallet: https://wallet.gooddollar.org/
2. Claim daily G$ UBI
3. Use G$ for SecureFlow payments

### Smart Accounts

- **Gasless Transactions**: Transactions sponsored via Paymaster
- **Delegated Execution**: Users can delegate transaction execution
- **Enhanced Security**: Smart account abstraction for better UX

## 🌐 Production Deployment

### Vercel Deployment

1. **Push to GitHub**

```bash
git add .
git commit -m "Production ready"
git push origin main
```

2. **Connect to Vercel**

- Go to https://vercel.com
- Import your GitHub repository
- Add environment variables (see `VERCEL_SETUP.md`)

3. **Required Environment Variables**

**Server-side:**
- `CELO_RPC_URL`: Celo RPC endpoint
- `CELOSCAN_API_KEY`: Celoscan API key

**Client-side (NEXT_PUBLIC_*):**
- `NEXT_PUBLIC_SECUREFLOW_ESCROW`: Contract address
- `NEXT_PUBLIC_CUSD_ADDRESS`: cUSD token address
- `NEXT_PUBLIC_REOWN_ID`: Reown (WalletConnect) project ID
- `NEXT_PUBLIC_CELO_RPC_URL`: Celo RPC endpoint

4. **Deploy**

Vercel will automatically deploy on push to main branch.

### Post-Deployment Checklist

- [ ] Verify contract addresses are correct
- [ ] Test wallet connection
- [ ] Test escrow creation
- [ ] Test payment flows
- [ ] Verify Self Protocol works (requires HTTPS)
- [ ] Check GoodDollar token whitelisting
- [ ] Test on mobile devices
- [ ] Verify all environment variables set

## 🛡️ Security

### Smart Contract Security

- **Audited**: Following OpenZeppelin security best practices
- **Reentrancy Protection**: All external functions protected
- **Access Control**: Role-based permissions (Owner, Arbiters)
- **Input Validation**: Comprehensive parameter checking
- **Emergency Controls**: Pause functionality for emergencies

### Frontend Security

- **HTTPS Required**: For Self Protocol and production
- **Wallet Connection**: Secure via Reown/WalletConnect
- **Input Sanitization**: All user inputs validated
- **Error Handling**: Graceful error handling throughout

## 📚 Documentation

- **[Self Protocol Integration](SELF_PROTOCOL_INTEGRATION.md)**: Complete Self Protocol guide
- **[Vercel Setup](VERCEL_SETUP.md)**: Production deployment guide

## 🧪 Testing

### Local Testing

**Note**: Self Protocol doesn't work on localhost. For testing:

1. **Use ngrok** (quick):
```bash
npm install -g ngrok
ngrok http 3000
# Use the https://xxx.ngrok.io URL
```

2. **Deploy to Vercel** (recommended):
- Every push creates a preview deployment
- Perfect for testing Self Protocol

### Contract Testing

```bash
# Run tests
npx hardhat test

# Verify contracts
npx hardhat run scripts/verify-contracts.js --network celo
```

## 🛠️ Development

### Available Scripts

**Root:**
```bash
npm install           # Install dependencies
npm run compile       # Compile contracts
npm test             # Run tests
```

**Frontend:**
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
```

### Project Structure

- **Contracts**: Solidity smart contracts in `contracts/`
- **Frontend**: Next.js app in `frontend/`
- **Scripts**: Deployment and utility scripts in `scripts/`

## 📊 Contract Information

### Main Contract

- **Address**: `0x067FDA1ED957BB352679cbc840Ce6329E470fd07`
- **Network**: Celo Mainnet
- **Explorer**: [View on Celoscan](https://celoscan.io/address/0x067FDA1ED957BB352679cbc840Ce6329E470fd07)
- **Version**: 1.0.0

### Features

- ✅ Modular architecture
- ✅ Multi-arbiter consensus
- ✅ Reputation system
- ✅ Job applications
- ✅ Enterprise security
- ✅ Native & ERC20 support
- ✅ Self Protocol integration
- ✅ GoodDollar support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **GitHub Issues**: Report bugs and request features
- **Documentation**: See project docs for detailed guides
- **Contract Explorer**: [Celoscan](https://celoscan.io/address/0x067FDA1ED957BB352679cbc840Ce6329E470fd07)

## 🙏 Acknowledgments

- **Celo Network**: For the amazing blockchain infrastructure
- **Self Protocol**: For privacy-first identity verification
- **GoodDollar**: For Universal Basic Income token support
- **OpenZeppelin**: For secure smart contract libraries
- **Reown/WalletConnect**: For wallet connection infrastructure

---

**Built with ❤️ for the decentralized future of work**

_SecureFlow - Where trust meets technology_

**Version**: 1.0.0 | **Status**: Production Ready ✅
