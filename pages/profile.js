import { MainContext } from '../context'
import BigNumber from 'bignumber.js'
import { useContext, useState } from 'react'
import styles from '../styles/Home.module.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Player } from '@livepeer/react';
import { Poster, useLivepeerProvider } from '@livepeer/react'
import { useCreateStream } from '@livepeer/react';


//here
export default function Profile() {
    const provider = useLivepeerProvider();
    const [streamName, setStreamName] = useState();

    const {
        mutate: createStream,

        data: stream,

    } = useCreateStream({
        name: streamName,
    })
    const [file, setFile] = useState()
    const [image, setImage] = useState()
    const [URI, setURI] = useState()
    const [amount, setAmount] = useState()
    const { bundlrInstance, initialiseBundlr, balance, fetchBalance } = useContext(MainContext)
    async function initialize() {
      initialiseBundlr()
    }
    function onFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        const image = URL.createObjectURL(file)
        setImage(image)
        let reader = new FileReader()
        reader.onload = function () {
          if (reader.result) {
            setFile(Buffer.from(reader.result))
          }
        }
        reader.readAsArrayBuffer(file)
      }
    }
  
    async function uploadFile() {    
      let tx = await bundlrInstance.uploader.upload(file, [{ name: "Content-Type", value: "image/png" }])
      console.log('tx: ', tx)
      setURI(`http://arweave.net/${tx.data.id}`)
  
    }
  
    async function fundWallet() {
      if (!amount) return
      const amountParsed = parseInput(amount)
      let response = await bundlrInstance.fund(amountParsed)
      console.log('Wallet funded: ', response)
      fetchBalance()
    }
  
    function parseInput (input) {
      const conv = new BigNumber(input).multipliedBy(bundlrInstance.currencyConfig.base[1])
      if (conv.isLessThan(1)) {
        console.log('error: value too small')
        return
      } else {
        return conv
      }
    }
  
    return (
      <><div style={containerStyle}>
            {!balance && <button onClick={initialize} className={styles.logo}>Please Connect Wallet to continue</button>}
            {balance && (
                <Card style={{ width: '18rem', border: 'solid-white' }}>
                    <Card.Title>Upload Video</Card.Title>
                    <hr />
                    <div>
                        <p></p>
                        <h3>Balance: {balance}</h3>
                        <div style={{ padding: '20px 0px' }}>
                            <input onChange={e => setAmount(e.target.value)} />
                            <button onClick={fundWallet}>Fund Wallet</button>
                        </div>
                        <input
                            type="file"
                            onChange={onFileChange} />
                        <Button variant="success" onClick={uploadFile}>Upload File</Button>
                        {image && <img src={image} style={{ width: '200px' }} />}
                        {URI && <a href={URI}>{URI}</a>}
                    </div>
                </Card>
            )}
        </div>
       
        <div>
        {balance && (
        <><h3>Create a LiveStream</h3><input onChange={(e) => setStreamName(e.target.value)}
                        className='p-2 mt-4 text-field' placeholder='Stream Name' /><button onClick={() => createStream?.()} className='p-2 mx-3 btn btn-success '>
                            create Stream
                        </button></>
        )}
        {stream && (
    <>
    <p>Stream Key: {stream.streamKey}</p>
    <p>Stream Name: {stream.name}</p>
    <p>PlayBack id: {stream.playbackId}</p>
      

    </>
    )}
        
    
    
        </div></>
    )
  }
  
  const containerStyle = {
    padding: '100px 20px'
  }